#!/bin/sh
npm run build \
&& \
sed -e 's/window/self/g' -e 's/document/self/g' -e 's/parent/undefined/g' \
    background/background.bundled.worker.js -i
