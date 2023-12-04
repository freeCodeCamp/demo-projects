import { join, dirname } from 'path';

import { config } from 'dotenv';
import fetch from 'node-fetch';
import { writeFileSync } from 'fs';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(new URL(import.meta.url)));
const envFilePath = join(`${__dirname}/`, '.env');
config({ path: envFilePath });

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
  writeFileSync(
    envFilePath,
    `PORT=${PORT}
TWITCH_CLIENT_ID=${TWITCH_CLIENT_ID}
TWITCH_CLIENT_SECRET=${TWITCH_CLIENT_SECRET}
# Expires in ~60 days
ACCESS_TOKEN=${accessToken}
`
  );
};

updateApiKey();
