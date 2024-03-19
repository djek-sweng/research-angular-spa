#!/bin/sh

find . \
  -iname "bin" \
  -o -iname "obj" \
  -o -iname "dist" \
  -o -iname "node_modules" \
  -o -iname ".angular" \
  -o -iname "*.sqlite" | xargs rm -rf
