#!/bin/bash

2>&1

export DISABLE_WEBSOCKETS=0
export PORT=${METEOR_SERVER_PORT}
export MONGO_URL=null
export ROOT_URL=http://exchange.inmobi.com
exec nodejs ${EP_GEN_CODE_DIRECTORY}/bundle/main.js
