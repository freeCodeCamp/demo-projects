const express = require("express");
const app = express();
const cors = require("cors")();

const log = require("./utilities/logger");
const config = require("./config");

const outReqLimiter = require("./utilities/outbound-reqs-limiter");
const blacklist = require("./utilities/blacklist");
const { validate, validateLegacy } = require("./utilities/req-validate");

if (!config.serveStaticData) {
  var Datastore = require("nedb");
  var db = new Datastore({ filename: config.db.dbPath });
  db.loadDatabase();

  if (config.db.enableCompaction) {
    db.persistence.setAutocompactionInterval(config.db.compactionMillisecs);
  }

  db.ensureIndex({ fieldName: "query" }, function(err) {
    if (err) log.error(err, "unable to set db index");
  });

  var dbMware = function(db) {
    return function(req, res, next) {
      req.db = db;
      next();
    };
  };

  var cacheCheck = function() {
    var d = Date.now();
    var ets = config.db.dataExpirationSecs;
    log.info("cache expiration check");
    db.remove(
      {
        createdAt: {
          $lt: d - 1000 * ets
        }
      },
      { multi: true }
    );
  };

  cacheCheck();
  setInterval(cacheCheck, config.db.dataExpirationSecs * 500);

  app.use(dbMware(db));

  var request = require("request");
  var reqOptions = {
    method: "GET",
    headers: {
      "Client-ID": config.twitchCID,
      "Authorization": `Bearer ${config.accessTOKEN}`
    }
  };
}

app.enable("trust proxy");

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

app.get("/helix/:route", cors, blacklist, validate, function(req, res, next) {
  if (config.serveStaticData) return next("route");
  var route = req.params.route;
  var qs = req.query;
  const query =
    route + Object.keys(qs).reduce((a, q) => `${a}:${q}=${qs[q]}`, "");
  req.db.findOne({ query }, function(err, dbCache) {
    // if data is cached return it
    if (err) return next(err);
    if (dbCache) {
      log.info(`${query} - cached - "${req.headers.referer}" - ${req.ip}`);
      res.json(dbCache.data);
    } else {
      // get data from twitch api, store and serve it
      if (outReqLimiter(req))
        return next({ status: 429, message: "outbound rate limiter" });

      reqOptions.url = `${config.baseApiUrl}/helix/${route}`;
      reqOptions.qs = qs;
      request(reqOptions, function(err, response, body) {
        if (err) return next(err);
        log.info(`${query} - new - "${req.headers.referer}" - ${req.ip}`);
        var cacheItem = {
          query,
          data: JSON.parse(body),
          ip: req.ip,
          referer: req.headers.referer,
          createdAt: Date.now()
        };

        req.db.insert(cacheItem, function(err) {
          if (err) return next(err);
          res.json(cacheItem.data);
        });
      });
    }
  });
});

const staticHandler = require("./utilities/static-data-handler");
app.get("/helix/:route", cors, blacklist, validate, function(req, res, next) {
  const {
    params: { route },
    query,
    headers: { referer },
    ip
  } = req;
  const _q =
    route + Object.keys(query).reduce((a, q) => `${a}:${q}=${query[q]}`, "");
  log.info(`${_q} - static - "${referer}" - ${ip}`);
  const data = staticHandler(route, query);
  if (data) {
    res.json(data);
  } else {
    next();
  }
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
const getLegacyAPIDAta = require("./utilities/legacy-data-handler");
app.get("/twitch-api/:type/:name", blacklist, cors, validateLegacy, function(
  req,
  res,
  next
) {
  const {
    params: { type, name },
    headers: { referer },
    ip
  } = req;
  log.info(`${type}/${name} - static (kraken) - "${referer}" - ${ip}`);

  var data = getLegacyAPIDAta(req.params.type, req.params.name);

  if (data) {
    setTimeout(() => sendData(req, res, data), 1000);
  } else {
    log.warn(
      `${type}/${name} - static (kraken) not found - "${referer}" - ${ip}`
    );
    next();
  }
});

var fs = require("fs");
app.get("/reset-db", function(req, res, next) {
  if (process.env.ADMIN_PWD && req.query.pwd === process.env.ADMIN_PWD) {
    try {
      fs.unlinkSync(__dirname + "/.data/db");
    } catch (e) {
      return next(e);
    }
    res.type("txt").send("OK");
  } else {
    res
      .type("txt")
      .status(401)
      .send("Unauthorized");
  }
});

const {
  updateStaticData,
  updateLegacyStaticData
} = require("./static-data/update");
app.get("/update-static", async (req, res, next) => {
  const { pwd, type } = req.query;
  if (process.env.ADMIN_PWD && pwd === process.env.ADMIN_PWD) {
    const isLegacy = type === "legacy";
    let _update = isLegacy ? updateLegacyStaticData : updateStaticData;
    log.info(`updating static data${isLegacy ? " (legacy)" : ""}...`);
    try {
      await _update();
      log.info(`update static data${isLegacy ? " (legacy)" : ""} OK`);
      res.type("text").send("OK");
    } catch (err) {
      return next(err);
    }
  } else {
    res
      .type("txt")
      .status(401)
      .send("Unauthorized");
  }
});

app.use(function(req, res) {
  sendData(req, res, null, { status: 404, error: "not found" });
});

app.use(function(err, req, res, next) {
  log.error(`!! ${err.message || err.msg || err.error}`);
  err.status = err.status || 500;
  err.error = err.error || "internal server error";
  sendData(req, res, null, err);
});

app.listen(config.port, function() {
  log.info("fcc twitch proxy listening on port " + config.port);
});
