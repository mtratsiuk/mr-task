#!/usr/bin/env bash

set -exu

cd "$(dirname "$0")"/..

npx lerna bootstrap --hoist

npm run lint
npm run test

cd ./packages/mr-demo-form
npm run build
