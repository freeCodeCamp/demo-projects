#!/bin/bash

node $(pwd)/updateApiKey.js && pm2 reload twitch-proxy --update-env
