const { host, validRoutes, validLegacyRoutes } = require('../config');
const log = require('./logger');

const validate = (req, res, next) => {
  delete req.query.callback;
  const {
    params: { route },
    headers: { referer },
    query,
    ip,
  } = req;
  if (!route) return next({ status: 404, error: 'not found' });
  if (!validRoutes[route]) {
    log.warn(`>> invalid route ${route} - "${referer}" - ${ip}`);
    return res.status(403).json({
      error: 'forbidden',
      status: 403,
      msg: `unaccepted route: ${route} - see ${host} for infos`,
    });
  }
  const validQParams = validRoutes[route].q;
  const _qParams = Object.keys(query);
  const isValidQuery = _qParams.reduce(
    (valid, q) => validQParams.includes(q),
    false
  );
  if (!isValidQuery) {
    const _q = _qParams.join('&');
    log.warn(`>> invalid query ${route}?${_q} - "${referer}" - ${ip}`);
    return res.status(403).json({
      error: 'forbidden',
      status: 403,
      msg: `unaccepted route query: ${route}?${_q} - see ${host} for infos`,
    });
  }
  next();
};

const validateLegacy = (req, res, next) => {
  const {
    params: { type },
    headers: { referer },
    ip,
  } = req;
  if (!type) return next({ status: 404, error: 'not found' });
  if (validLegacyRoutes.indexOf(type) === -1) {
    log.warn(`>> ${type}(kraken) - "${referer}" - ${ip}`);
    return next({
      error: 'forbidden',
      status: 403,
      msg: `unaccepted route: ${type} - see ${host} for infos`,
    });
  }
  next();
};

module.exports = {
  validate,
  validateLegacy,
};
