const express = require('express');
const app = express();
const cors = require('cors')();

const log = require('./utilities/logger');
const config = require('./config');

const blacklist = require('./utilities/blacklist');

const { validate } = require('./utilities/req-validate');

app.enable('trust proxy');

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

const staticHandler = require('./utilities/static-data-handler');
app.get('/yelp/:route', cors, blacklist, validate, function (req, res, next) {
  const {
    params: { route },
    query,
    headers: { referer },
    ip
  } = req;
  const _q =
    route + Object.keys(query).reduce((a, q) => `${a}:${q}=${query[q]}`, '');
  log.info(`${_q} - static - "${referer}" - ${ip}`);
  const data = staticHandler(route, query);
  if (data) {
    res.json(data);
  } else {
    next();
  }
});

app.get('/status/ping', (req, res) => {
  res.status(200).send({ msg: 'pong' });
});

// Legacy API static data snapshot
const sendData = (req, res, data, err) => {
  if (req.query.callback) {
    res.jsonp(err || data);
  } else {
    var stat = err ? err.status : 200;
    res.status(stat).json(err || data);
  }
};

app.use(function (req, res) {
  sendData(req, res, null, { status: 404, error: 'not found' });
});

app.use(function (err, req, res) {
  log.error(`!! ${err.message || err.msg || err.error}`);
  err.status = err.status || 500;
  err.error = err.error || 'internal server error';
  sendData(req, res, null, err);
});

app.listen(config.port, function () {
  log.info('fcc yelp proxy listening on port ' + config.port);
});
