#!/usr/bin/env node

import createZXPFromConfig from '../index'
import * as minimist from 'minimist'
import { defaultsDeep } from 'lodash'
import * as path from 'path'
import chalk from 'chalk'

const projectDir = process.cwd()

const version = require('../../package.json').version
const projectPackage = require(path.join(projectDir, 'package.json'))

import { IConfig } from '../index'

function help() {
  console.log(`
  Usage: cep-packager [options] [input]

  creates zxp bundles


  Options:
  
    --name <name>                   name of the zxp. defaults to package.json name
    --version <version>             version of the zxp. defaults to package.json version
    --out-dir <out-dir>             output directory. default: archive
    --cert-file <file>              certificate file. will self-sign if not provided
    --cert-password <password>      certificate password. default: password
    --cert-country <country>        certificate country. default: US
    --cert-province <province>      certificate province. default: CA
    --cert-org <org>                certificate org. default: "My Company"
    --cert-name <name>              certificate name. default: "My Company"
    --cert-timestamp <timestamp>    certificate timestamp
    --extract <dir>                 extract zxp to directory
    --silent                        silence output
  `)
}

const argv = minimist(process.argv.slice(2))

if (argv.version) {
  console.log(version)
  process.exit(0)
}

if (argv.help) {
  help()
  process.exit(0)
}

const inputPath = argv['_'][0]
if (!inputPath) {
  console.log(chalk.red(`  Error: Input is required.`))
  help()
  process.exit(1)
}

let config: IConfig = defaultsDeep(
  {
    inputDirectory: inputPath,
    name: argv['name'],
    version: argv['version'],
    outputDirectory: argv['out-dir'],
    certFile: argv['cert-file'],
    certPassword: argv['cert-password'],
    certCountry: argv['cert-country'],
    certProvince: argv['cert-province'],
    certOrg: argv['cert-org'],
    certName: argv['cert-name'],
    certTimestamp: argv['cert-timestamp'],
    silent: argv['silent'],
    extractDirectory: argv['extract'],
  },
  {
    name: projectPackage.name,
    version: projectPackage.version,
  },
  {
    name: process.env.ZXP_NAME,
    version: process.env.ZXP_VERSION,
    certFile: process.env.ZXP_CERT,
    certPassword: process.env.ZXP_CERT_PASSWORD,
    certCountry: process.env.ZXP_CERT_COUNTRY,
    certProvince: process.env.ZXP_CERT_PROVINCE,
    certOrg: process.env.ZXP_CERT_ORG,
    certName: process.env.ZXP_CERT_NAME,
    certTimestamp: process.env.ZXP_CERT_TIMESTAMP,
    extractDirectory: process.env.ZXP_EXTRACT,
  },
  {
    outputDirectory: 'archive',
    certPassword: 'password',
  }
)

config.inputDirectory = path.resolve(config.inputDirectory)
config.outputDirectory = path.resolve(config.outputDirectory)
if (config.extractDirectory)
  config.extractDirectory = path.resolve(config.extractDirectory)

createZXPFromConfig(config).catch(e => console.error(chalk.red(e.message)))
