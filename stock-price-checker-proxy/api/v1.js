const express = require("express");
const router = express.Router();

const axios = require("axios");
const cors = require("cors");

const Datastore = require("nedb");
const db = new Datastore({
  filename: "./cache/db",
  autoload: true
});

// cleaning cache data on app restart
db.remove(
  { $or: [{ data: {} }, { data: "Unknown symbol" }] },
  { multi: true },
  (err, count) => {
    console.log("\nremoving garbage from cache...");
    console.log(err ? `error: ${err}` : `deleted items: ${count}`);
    if (count) {
      console.log("compacting db...");
      db.persistence.compactDatafile();
    }
    console.log("done !\n");
  }
);

const _symbols = "abcdefghijklmnopqrstuvwxyz0123456789";
const getUID = (n = 8, symbols = _symbols) =>
  [...Array(n).keys()]
    .map(() => symbols[Math.floor(Math.random() * symbols.length)])
    .join("");

const { IEX_API_KEY = "", CACHE_TTL_MINUTES = 10 } = process.env;

const validTickerRegExp = /^[a-z]{1,6}$/;
const isValidStock = stock => validTickerRegExp.test(stock);

router.use(cors());

router.get("/stock/:stock/quote", (req, res, next) => {
  const req_id = getUID();
  console.log(
    `rid: ${req_id} [${req.method}] ${
      req.originalUrl
    } - ${new Date().toUTCString()}`
  );
  let { stock } = req.params;
  stock = stock.toLowerCase().trim();

  if (!isValidStock(stock)) {
    console.log(`rid: ${req_id} xx ${stock} invalid ! xx`);
    return res.json("Invalid symbol");
  }

  const lastValidTimestamp = Date.now() - CACHE_TTL_MINUTES * 60 * 1000;
  db.findOne(
    { _id: stock, updatedAt: { $gt: lastValidTimestamp } },
    async (err, cached) => {
      if (err) return next(err);
      if (cached) {
        console.log(`rid: ${req_id} ** ${stock} from cache **`);
        return res.json(cached.data);
      }
      try {
        const { data } = await axios.get(
          `https://cloud.iexapis.com/stable/stock/${stock}/quote?token=${IEX_API_KEY}`
        );
        console.log(`rid: ${req_id} !! ${stock} from api !!`);
        res.json(data);
        db.update(
          {
            _id: stock
          },
          { _id: stock, data, updatedAt: Date.now() },
          { upsert: true },
          () => console.log(`rid: ${req_id} ++ ${stock} stored ++`)
        );
      } catch (e) {
        if (e.response) {
          res.status(e.response.status).json(e.response.data);
          db.update(
            {
              _id: stock
            },
            { _id: stock, data: e.response.data, updatedAt: Date.now() },
            { upsert: true }
          );
        } else {
          next(e);
        }
      }
    }
  );
});

module.exports = router;
