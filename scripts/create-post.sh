#!/bin/bash

fileName=$1
location=./src/pages/$fileName
postDate=`date +%Y-%m-%d`
tile="${fileName//-/ }"

mkdir -p $location

cat > $location/index.md << EOF
---
title: '$tile'
date: '$postDate'
---
EOF