#!/usr/bin/env bash

set -exu

cd "$(dirname "$0")"/..

npm ci

npx lerna bootstrap --hoist

npm run lint
