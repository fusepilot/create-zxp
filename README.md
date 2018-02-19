# create-zxp

## What

Creates Adobe ZXP Packages.

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
