/*
 *
 *
 *       Complete the handler logic below
 *
 *
 */

const MongoClient = require('mongodb');
const CONNECTION_STRING = process.env.DB_URI;
const request = require('request');

function StockHandler() {
  this.getData = function(stock, callback) {
    request(
      `https://stock-price-checker-proxy.freecodecamp.rocks/v1/stock/${stock}/quote`,
      function(error, response, body) {
        if (!error && response.statusCode == 200) {
          const result = JSON.parse(body);
          callback('stockData', {
            stock: result.symbol,
            price: result.latestPrice
          });
        } else {
          console.log('issue!');
          callback('stockData', { error: 'external source error' });
        }
      }
    );
  };

  this.loadLikes = function(stock, like, ip, callback) {
    MongoClient.connect(CONNECTION_STRING, { useUnifiedTopology: true }, (err, client) => {
      if (err) console.log(err);

      const db = client.db('stock-price-checker-v0');
      const collection = db.collection('stock_likes');
      if (!like || like === 'false') {
        collection.find({ stock: stock.toLowerCase() }).toArray((err, doc) => {
          if (err) console.log(err);

          let likes = 0;
          if (doc.length > 0) {
            likes = doc[0].likes ? doc[0].likes.length : 0;
          }
          callback('likeData', { stock: stock, likes: likes });    
        });
      } else {
        collection.findOneAndUpdate(
          { stock: stock.toLowerCase() }, 
          { $addToSet: { likes: ip } }, 
          { upsert: true, returnNewDocument : true }, 
          (err, doc) => {
            if (err) console.log(err);

            let likes;
            if (doc) {
              likes = doc.value ? doc.value.likes.length : 1;
            }

            callback('likeData', {
              stock: stock,
              likes: likes
            });
        });
      }
    });
  };
}

module.exports = StockHandler;
