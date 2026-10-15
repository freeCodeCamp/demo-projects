require('dotenv').config({ silent: true });

module.exports = {
  serveStaticData: false,
  port: parseInt(process.env.PORT) || 3000,
  host: 'https://yelp-proxy.freecodecamp.rocks/',
  logLevels: {
    _default: 'info',
    file: 'warn',
    filePath: `${__dirname}/.logs`
  },
  validRoutes: {
    businesses: { q: ['name', 'city'] },
    reviews: { q: ['stars'] }
  },
  outboundReqsLimiter: {
    active: true,
    checkIntervalMs: 15000,
    maxOBReqsPerInterval: 55
  },
  blacklist: {
    active: true,
    urls: [
      'www.donotargue.com',
      'www.csulbesports.org',
      'https://www.photoshoptroll.com'
    ],
    ips: ['78.145.103.20', '107.178.192.90', '204.236.208.181'],
    cooldown: 3000
  },
  baseApiUrl: 'https://fusion.yelp.com/'
};
