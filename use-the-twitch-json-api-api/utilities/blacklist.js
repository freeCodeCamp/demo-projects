const log = require('./logger');
const {
  blacklist: { cooldown, urls = [], ips = [], active },
} = require('../config');

module.exports = function(req, res, next) {
  const ref = req.headers.referer || '';
  if (active && (ips.indexOf(req.ip) > -1 || urls.find(r => ref.match(r)))) {
    log.warn(`>> ${ref} - ${req.ip} blacklisted`);
    setTimeout(function() {
      return res.status(403).send();
    }, parseInt(cooldown) || 2000);
  } else {
    next();
  }
};
