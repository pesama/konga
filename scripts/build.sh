#!/usr/bin/env bash

npm run build

rev=$(git rev-parse --short HEAD)

cd build

git init
git config user.name "SNAP BOT"
git config user.email "snapbot@smarla.com"

git remote add upstream "https://$GH_TOKEN@github.com/pritok/konga.git"
git fetch upstream
git reset upstream/builds

git add -A .
git commit -m "Build ${rev}"
git push -q upstream HEAD:builds