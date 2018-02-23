# create-zxp

## What

Creates Adobe ZXP Packages with zero configuration.

## Install

With Yarn:

```sh
$ yarn add --dev create-zxp
```

With NPM:

```sh
$ npm install --save-dev create-zxp
```

## Usage

### CLI

```
cep-packager [input] [options]

Options:

  --name <name>                   name of the zxp. default: package.json name or process.env.ZXP_NAME
  --version <version>             version of the zxp. default: package.json version or process.env.ZXP_VERSION
  --out-dir <out-dir>             output directory. default: archive
  --cert-file <file>              certificate file. default: self-sign or process.env.ZXP_CERT
  --cert-password <password>      certificate password. default: password or process.env.ZXP_CERT_PASSWORD
  --cert-country <country>        certificate country. default: US or process.env.ZXP_CERT_COUNTRY
  --cert-province <province>      certificate province. default: CA or process.env.ZXP_CERT_PROVINCE
  --cert-org <org>                certificate org. default: "My Company" or process.env.ZXP_CERT_ORG
  --cert-name <name>              certificate name. default: "My Company" or process.env.ZXP_CERT_NAME
  --cert-timestamp <timestamp>    certificate timestamp. default: process.env.ZXP_CERT_TIMESTAMP
  --silent                        silence output
```

#### Example:

Assuming a production build of your extension is in the `build` directory and doesn't contain symbolic links:

```sh
$ create-zxp ./build
```

Will create a self-signed .zxp file in `./archives`.

### Node API

```javascript
const createZXP = require('create-zxp')

createZXP({
  inputDirectory: string            // input source for zxp
  outputFile: string                // output file
  tempDir: string                   // temp directory to use for building
  name: string                      // name of the zxp
  version: string                   // version of the zxp
  certFile?: string                 // certificate to sign zxp with
  certPassword?: string             // certificate password
  certCountry?: string              // certificate country
  certProvince?: string             // certificate province
  certOrg?: string                  // certificate org
  certName?: string                 // certificate name
  certTimestamp?: string            // certificate timestamp
  silent?: boolean                  // silent stdout
}).catch(e => console.error(e))
```
