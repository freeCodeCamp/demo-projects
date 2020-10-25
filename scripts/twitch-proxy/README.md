## Setup

```
npm install
```

## Usage

First, make sure the Twitch Proxy project is running in pm2 under the name `twitch-proxy`.

To schedule monthly Twitch API key updates, run the following command:

```
pm2 start ~/demo-projects/scripts/twitch-proxy/update-and-reload-twitch-proxy.sh --no-autorestart --cron "0 0 1 * *"
```
