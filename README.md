# Frost Client

[![CircleCI](https://circleci.com/gh/poetapp/frost-client.svg?style=svg)](https://circleci.com/gh/poetapp/frost-client)
[![Renovate enabled](https://img.shields.io/badge/renovate-enabled-brightgreen.svg)](https://renovatebot.com/)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)
[![Join the chat at https://gitter.im/poetapp/Lobby](https://badges.gitter.im/poetapp/Lobby.svg)](https://gitter.im/poetapp/Lobby)

Frost Client helps you to easily integrate your applications with [Po.et's API](https://docs.poetnetwork.net/use-poet/poet-api.html).

## Index

- [Frost Client](#frost-client)
  - [Index](#index)
  - [Getting Started](#getting-started)
    - [Install](#install)
    - [Import](#import)
    - [Initialize](#initialize)
  - [Methods](#methods)
    - [Create Work](#create-work)
    - [Get Work By ID](#get-work-by-id)
    - [Get All Works](#get-all-works)
  - [Contributing](#contributing)
  - [Security](#security)

## Getting Started

### Install

Install Frost Client from the NPM repository or directly from this GitHub repository:

```bash
$ npm install @po.et/frost-client
```

```bash
$ yarn add @po.et/frost-client
```

```bash
$ git clone git@github.com:poetapp/frost-client.git
$ cd frost-client && npm link
```

### Import

```javascript
import { Frost } from '@po.et/frost-client'
```

```javascript
const { Frost } = require('@po.et/frost-client')
```

### Initialize

You will need a token to access the Po.et API, which you can obtain from [explorer.poetnetwork.net](https://explorer.poetnetwork.net).

```javascript
import { Frost } from '@po.et/frost-client'

const config = {
  host: 'https://explorer.poetnetwork.net', // required
  timeout: 10 // default 10 seconds
}

const token = YOUR_POET_API_TOKEN

const frost = new Frost(config)
```

## Methods

### Create Work
Returns a promise with the API's response. Throws in case of errors.

```javascript

async function createWork() {
  try {
    const work = {
      name: 'My first work in Frost',
      datePublished: '2017-11-24T00:38:41.595Z', // ISO date
      dateCreated: '2017-11-24T00:38:41.595Z', // ISO date
      author: 'Me',
      tags: 'Frost,the best', // tags separation by commas
      content: 'The best content'
    }

    const { workId } = await frost.createWork(token, work)

  } catch(e) {
    console.log(e)
  }

}

createWork()

```

### Get Work By ID

Returns a promise with the API's response. Throws in case of errors.

```javascript
async function getWork () {
  try {
    const workId = '123456'
    const work = await frost.getWork(token, workId)
  } catch(e) {
    console.log(e)
  }
}

getWork()
```

### Get All Works

Returns a promise with the API's response. Throws in case of errors.

```javascript
const getAllWorks = async () => {
  try {
    const works = await frost.getWorks(token)
  } catch(e) {
    console.log(e)
  }
}

getAllWorks()

```

### Post Archive

Upload a file to Frost.

Example using NodeJS:

```js
const readStream = createReadStream('path/to/file.ext')
const [{ archiveUrl }] = await frostClient.postArchive(apiKey, readStream)
```

Or, if in a browser:

```js
const file = document.querySelector('input[type=file]').files[0]
const [{ archiveUrl }] = await frostClient.postArchive(apiKey, file)
```

You can then use this `archiveUrl` as part of the claim that will be submitted to Frost with `createWork`:

```js
const work = {
  name: 'My first work in Frost',
  datePublished: '2017-11-24T00:38:41.595Z', 
  dateCreated: '2017-11-24T00:38:41.595Z', 
  author: 'Me',
  tags: 'Frost,the best', 
  archiveUrl, // omit the content field
}

const { workId } = await frost.createWork(token, work)
```

## [Contributing](https://github.com/poetapp/documentation/blob/master/CONTRIBUTING.md)

## [Security](https://github.com/poetapp/documentation/blob/master/SECURITY.md)
