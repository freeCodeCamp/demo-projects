const {
  outboundReqsLimiter: { active, maxOBReqsPerInterval, checkIntervalMs },
} = require('../config');
const log = require('./logger');

var outReqCounter = { tstamp: Date.now(), req: 0 };
var outReqLimiter = function(req) {
  if (!active) return false;
  var now = Date.now();
  if (now - outReqCounter.tstamp <= checkIntervalMs) {
    outReqCounter.req++;
  } else {
    outReqCounter = { tstamp: Date.now(), req: 1 };
  }
  var elapsed = now - outReqCounter.tstamp;
  log.info(`** ob rate - ${outReqCounter.req} reqs / ${elapsed} ms`);
  if (outReqCounter.req >= maxOBReqsPerInterval) {
    const {
      headers: { referer },
      ip,
      originalUrl,
    } = req;
    log.warn(`>> RATE LIMITER - ${referer} - ${ip} - ${originalUrl}`);
    return true;
  }
  return false;
};

module.exports = outReqLimiter;
