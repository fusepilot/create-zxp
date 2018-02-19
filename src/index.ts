import { createZXPFromConfig } from './create-zxp'
export default createZXPFromConfig

export interface IConfig {
  inputDirectory: string
  outputDirectory: string
  name: string
  version: string
  certFile: string
  certPassword: string
  certCountry: string
  certProvince: string
  certOrg: string
  certName: string
  certTimestamp: string
  silent: boolean
}
