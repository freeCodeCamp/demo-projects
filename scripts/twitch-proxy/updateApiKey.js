const path = require('path');
const envFilePath = path.join(`${__dirname}/../../apps/twitch-proxy/`, '.env');
require('dotenv').config({ path: envFilePath });
const fetch = require('node-fetch');
const fs = require('fs');
const { TWITCH_CLIENT_ID, TWITCH_CLIENT_SECRET, PORT } = process.env;

const updateApiKey = async () => {
  const url = `https://id.twitch.tv/oauth2/token?client_id=${TWITCH_CLIENT_ID}&client_secret=${TWITCH_CLIENT_SECRET}&grant_type=client_credentials`;
  const keyObj = await fetch(url, {
    method: 'POST'
  })
    .then(res => res.json())
    .catch(err => console.log(err));
  
  const accessToken = keyObj.access_token;
  if (!accessToken) {
    return console.error('Twitch api did not return an accessToken');
  }

  // Write new file with updated token
  fs.writeFileSync(envFilePath, `PORT=${PORT}
TWITCH_CLIENT_ID=${TWITCH_CLIENT_ID}
TWITCH_CLIENT_SECRET=${TWITCH_CLIENT_SECRET}
# Expires in ~60 days
ACCESS_TOKEN=${accessToken}
`);
}

updateApiKey();
