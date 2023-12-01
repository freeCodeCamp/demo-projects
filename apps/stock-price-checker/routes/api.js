/*
 *
 *
 *       Complete the API routing below
 *
 *
 */

'use strict';

var StockHandler = require('../controllers/stockHandler.js');

module.exports = function (app) {
  var stockPrices = new StockHandler();

  app.route('/status/ping').get(function (req, res) {
    res.send({ msg: 'pong' }).status(200);
  });

  app.route('/api/stock-prices').get(function (req, res) {
    var stock = req.query.stock;
    var like = req.query.like || false;
    var requestIP = req.get('x-forwarded-for') || req.ip;
    var reqIP = requestIP.split(',')[0];
    reqIP = reqIP.replace(/\.\d*$/, '.0'); // ipv4
    reqIP = reqIP.replace(/[\da-f]*:[\da-f]*$/i, '0:0'); // ipv6
    var stockData = null;
    var likeData = null;
    var multiple = false;
    if (Array.isArray(stock)) {
      multiple = true;
      stockData = [];
      likeData = [];
    }
    function sync(finished, data) {
      if (finished == 'stockData') {
        multiple ? stockData.push(data) : (stockData = data);
      } else {
        multiple ? likeData.push(data) : (likeData = data);
      }

      if (!multiple && stockData && likeData !== null) {
        stockData.likes = likeData.likes;
        res.json({ stockData });
      } else if (multiple && stockData.length == 2 && likeData.length == 2) {
        if (stockData[0].stock == likeData[0].stock) {
          stockData[0].rel_likes = likeData[0].likes - likeData[1].likes;
          stockData[1].rel_likes = likeData[1].likes - likeData[0].likes;
        } else {
          stockData[0].rel_likes = likeData[1].likes - likeData[0].likes;
          stockData[1].rel_likes = likeData[0].likes - likeData[1].likes;
        }
        res.json({ stockData });
      }
    }
    if (multiple) {
      stockPrices.getData(stock[0], sync);
      stockPrices.loadLikes(stock[0], like, reqIP, sync);
      stockPrices.getData(stock[1], sync);
      stockPrices.loadLikes(stock[1], like, reqIP, sync);
    } else {
      stockPrices.getData(stock, sync);
      stockPrices.loadLikes(stock, like, reqIP, sync);
    }
  });
};
