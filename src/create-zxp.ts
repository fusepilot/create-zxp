import * as path from 'path'
import * as os from 'os'
import chalk from 'chalk'
import { promisify } from 'util'
import { execSync } from 'child_process'
import * as fs from 'fs-extra'
import { IConfig } from './index'

const { sign, selfSignedCert } = require('zxp-sign-cmd')
const selfSignedCertPromise = promisify(selfSignedCert)
const signPromise = promisify(sign)

export async function createZXPFromConfig(config: IConfig) {
  const cwdDir = process.cwd()
  const srcDir = path.join(cwdDir, 'dist')
  const packagePath = path.join(cwdDir, 'package.json')

  const { name, version } = await fs.readJSON(packagePath)
  const tempDir = path.join(os.tmpdir(), `${name}-${version}`)

  const outputFile = path.join(config.outputDirectory, `${name}-${version}.zxp`)

  await fs.remove(tempDir)
  await fs.ensureDir(tempDir)

  await createZXP({
    inputDirectory: config.inputDirectory,
    outputFile,
    tempDir,
    name: config.name,
    version: config.version,
    certFile: config.certFile,
    certPassword: config.certPassword,
    certCountry: config.certCountry,
    certProvince: config.certProvince,
    certOrg: config.certOrg,
    certName: config.certName,
    certTimestamp: config.certTimestamp,
    silent: config.silent,
  })
}

export async function createZXP({
  inputDirectory,
  outputFile,
  tempDir,
  name,
  version,
  certFile,
  certPassword = 'password',
  certCountry = 'US',
  certProvince = 'CA',
  certOrg = 'My Company',
  certName = 'My Company',
  certTimestamp,
  silent = false,
}: {
  inputDirectory: string
  outputFile: string
  tempDir: string
  name: string
  version: string
  certFile?: string
  certPassword?: string
  certCountry?: string
  certProvince?: string
  certOrg?: string
  certName?: string
  certTimestamp?: string
  silent?: boolean
}) {
  const info: Info[] = [
    ['input', inputDirectory],
    ['output', outputFile],
    ['name', name],
    ['version', version],
    ['country', certCountry],
    ['province', certProvince],
    ['org', certOrg],
    ['name', certName],
    ['password', certPassword.replace(/./g, '*')],
    ['timestamp', certTimestamp],
  ]

  if (!silent && certPassword === 'password') {
    console.warn(
      chalk.yellow(
        `Warning: You should provide a unique password before distribution.`
      )
    )
  }

  if (certFile) {
    info.unshift(['certificate', certFile])
  } else {
    info.unshift(['certificate', 'self-signed'])
    certFile = path.join(tempDir, 'zxp-cert.p12')
    const certRes = await selfSignedCertPromise({
      country: `"${certCountry}"`,
      province: `"${certProvince}"`,
      org: `"${certOrg}"`,
      name: `"${certName}"`,
      output: certFile,
      password: certPassword,
    })
  }

  try {
    if (!silent)
      console.log(
        chalk.gray(`Creating signed package with ${formatInfo(info)}`)
      )
    const signRes = await signPromise({
      input: inputDirectory,
      output: outputFile,
      cert: certFile,
      password: certPassword,
      timestamp: certTimestamp,
    })
  } catch (e) {
    throw Error(
      `Couldn't sign ${inputDirectory}. Ensure the input directory is a production build and does not contain any symbolic links.
      ${e.message}`
    )
  }

  if (!silent) console.log(chalk.gray(`Success. Created ZXP at ${outputFile}`))
}

type Info = [string, string | undefined]

function formatInfo(info: Info[]) {
  return info
    .filter(([name, value]) => value != undefined)
    .map(([name, value]) => `${name}="${value}"`)
    .join(' ')
}
