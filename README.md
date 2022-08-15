# mr-task

[![Coverage Status](https://coveralls.io/repos/github/mtratsiuk/mr-task/badge.svg?branch=master)](https://coveralls.io/github/mtratsiuk/mr-task?branch=master)

## Live demo page

https://misha.spris.dev/mr-task/

- [Deployed assets source code](https://github.com/mtratsiuk/mr-task/tree/gh-pages)

## Project Structure

- [mr-emails-input](./packages/mr-emails-input) - Zero-dependency reusable emails input component
- [mr-demo-form](./packages/mr-demo-form) - Static web page showcasing `@mr/emails-input` library usage

## Local Development

### Prerequisites

- [Node & npm](https://nodejs.org/en/download/)

### Install dependencies

```sh
npx lerna bootstrap --hoist
```

### Run tests

```sh
npm test [-- --watch]
```

### Launch `@mr/emails-input` development sandbox

```sh
cd ./packages/mr-emails-input
npm start
```
