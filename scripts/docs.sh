#!/bin/bash

set -o errexit -o nounset

npm run doc

rev=$(git rev-parse --short HEAD)

cd docs

git init
git config user.name "SNAP BOT"
git config user.email "snapbot@smarla.com"

git remote add upstream "https://$GH_TOKEN@github.com/pritok/konga.git"
git fetch upstream
git reset upstream/gh-pages

echo "konga.io" > CNAME

git add -A .
git commit -m "rebuild pages at ${rev}"
git push -q upstream HEAD:gh-pages