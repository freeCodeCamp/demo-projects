require("dotenv").config({ silent: true });

module.exports = {
  serveStaticData: false,
  twitchCID: process.env.TWITCH_CLIENT_ID,
  accessTOKEN: process.env.ACCESS_TOKEN,
  port: parseInt(process.env.PORT) || 3000,
  host: "https://twitch-proxy.freecodecamp.rocks/",
  logLevels: {
    _default: "info",
    file: "warn",
    filePath: `${__dirname}/.logs`
  },
  validRoutes: {
    streams: { q: ["user_id", "user_login"] },
    users: { q: ["login", "id"] },
    games: { q: ["id"] }
  },
  validLegacyRoutes: ["streams", "users", "channels"],
  db: {
    dbPath: `${__dirname}/.data/db`,
    dataExpirationSecs: 5400,
    enableCompaction: true,
    compactionMillisecs: 2705000
  },
  outboundReqsLimiter: {
    active: true,
    checkIntervalMs: 15000,
    maxOBReqsPerInterval: 55
  },
  blacklist: {
    active: true,
    urls: ["www.donotargue.com", "www.csulbesports.org", "https://www.photoshoptroll.com"],
    ips: ["78.145.103.20", "107.178.192.90", "204.236.208.181"],
    cooldown: 3000
  },
  baseApiUrl: "https://api.twitch.tv"
};
