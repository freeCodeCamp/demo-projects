const path = require('path');
const envFilePath = path.join(`${__dirname}/../../twitch-proxy/`, '.env');
require('dotenv').config({ path: envFilePath });
const fetch = require('node-fetch');
const fs = require('fs');
const { TWITCH_CLIENT_ID, TWITCH_CLIENT_SECRET } = process.env;

const updateApiKey = async () => {
  const envFileText = fs.readFileSync(envFilePath, 'utf-8');
  const url = `https://id.twitch.tv/oauth2/token?client_id=${TWITCH_CLIENT_ID}&client_secret=${TWITCH_CLIENT_SECRET}&grant_type=client_credentials`;
  const keyObj = await fetch(url, {
    method: 'POST'
  })
    .then(res => res.json())
    .catch(err => console.log(err));

  // Remove access token line from .env file
  const regex = /ACCESS\_TOKEN\=[\w\d]*\n?/gm;
  fs.writeFileSync(envFilePath, envFileText.replace(regex, ''));
  // Write new access token line to the end of the file
  fs.appendFileSync(envFilePath, `ACCESS_TOKEN=${keyObj.access_token}\n`);
}

updateApiKey();
