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

### Via CLI

Assuming a production build of your extension is in the `build` directory and doesn't contain symbolic links:

```sh
$ create-zxp ./build
```

Will create a self-signed .zxp file in ./archives.

### Via Node API

```javascript
const createZXP = require('create-zxp')
```
