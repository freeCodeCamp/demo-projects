const express = require("express");
const router = express.Router();

const axios = require("axios");
const cors = require("cors");

const Datastore = require("@seald-io/nedb");
const db = new Datastore({
  filename: "./cache/db",
  autoload: true
});

// cleaning cache data on app restart
db.remove(
  { $or: [{ stockData: {} }, { stockData: "Unknown symbol" }] },
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

const { ALPHA_VANTAGE_API_KEY = "", CACHE_TTL_MINUTES = 10 } = process.env;

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
        return res.json(cached.stockData);
      }
      try {
        const { data } = await axios.get(
          `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${stock}&apikey=${ALPHA_VANTAGE_API_KEY}`
        );
        console.log(`rid: ${req_id} !! ${stock} from api !!`);
        const temp = {...data?.['Global Quote']};
        let stockData;
        if (Object.keys(temp).length === 0 && temp.constructor === Object) {
          stockData = "Unknown symbol"; // Mimic IEX API response for this case
        } else {
          const symbol = temp["01. symbol"];
          const open = temp["02. open"];
          const high = temp["03. high"];
          const low = temp["04. low"];
          const close = temp["05. price"];
          const volume = temp["06. volume"];
          const latestTradingDay = temp["07. latest trading day"];
          const previousClose = temp["08. previous close"];
          const change = temp["09. change"];
          
          const parseFloatAndRound = (value) => Number(parseFloat(value).toFixed(2));

          stockData = {
            symbol,
            open: parseFloatAndRound(open),
            high: parseFloatAndRound(high),
            low: parseFloatAndRound(low),
            close: parseFloatAndRound(close),
            volume: Number(volume),
            latestTradingDay: new Date(latestTradingDay),
            previousClose: parseFloatAndRound(previousClose),
            change: parseFloatAndRound(change),
          };
        }
        res.json(stockData);
        db.update(
          {
            _id: stock
          },
          { _id: stock, stockData, updatedAt: Date.now() },
          { upsert: true },
          () => console.log(`rid: ${req_id} ++ ${stock} stored ++`)
        );
      } catch (e) {
        if (e.response) {
          res.status(e.response.status).json(e.response.stockData);
          db.update(
            {
              _id: stock
            },
            { _id: stock, stockData: e.response.stockData, updatedAt: Date.now() },
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
