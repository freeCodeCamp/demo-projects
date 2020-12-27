const express = require('express');
const socket = require('socket.io');
const https = require('https');

require('dotenv').config();

const app = express();
app.use(express.static('public'));

const portNum = process.env.PORT || 3000;

const server = app.listen(portNum, () => {
  console.log(`Listening on port ${portNum}`);
});

const io = socket(server);
let currentStockData = {};

function emitStockData() {
  io.emit('updateStockData', JSON.stringify(currentStockData));
}

io.on('connection', function(socket) {
  emitStockData();

  socket.on('newStock', function(stock) {
    if(!currentStockData.hasOwnProperty(stock.symbol) && Object.keys(currentStockData).length < 4) {
      const requestUrl = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${stock.symbol}&apikey=${process.env.APIKEY}`;
    
      https.get(requestUrl, res => {
        let stockData = '';
        res.setEncoding('utf8');

        res.on('data', result => {
          stockData += result;
        });

        res.on('end', () => {
          stockData = JSON.parse(stockData);

          if (stockData["Error Message"]) { //stock symbol requested doesn't exist
            io.emit('stopLoading');
          } else { //stock symbol requested found
            currentStockData[stock.symbol] = stockData['Time Series (Daily)']
            emitStockData();
          }

          res.on('error', (e) => {
            console.log('error fetching stock data');
            console.error(e);
            io.emit('stopLoading');
          });
        });
      });
    } else {
      io.emit('stopLoading');
    }
  });

  socket.on('deleteStock', function(stock) {
    console.log('delete' + stock);
    console.log(stock.symbol);
    if(currentStockData.hasOwnProperty(stock.symbol)) {
      delete currentStockData[stock.symbol];

      emitStockData();
    }
  });
});
