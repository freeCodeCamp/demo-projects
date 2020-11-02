#!/bin/bash

node ./updateApiKey.js && pm2 reload twitch-proxy --update-env
