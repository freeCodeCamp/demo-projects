var express = require('express');
require('dotenv').config();
var mongo = require('mongodb').MongoClient;

var app = express();

app.use(express.static('public'));

const api = require('./api.js');

var portNum = process.env.PORT || 3000;

mongo.connect(
  process.env.MONGO_URI,
  { useUnifiedTopology: true },
  function (err, client) {
    if (err) throw err;
    var db = client.db();
    console.log('Connected to MongoDB');
    api(app, db);
    app.listen(portNum, () => {
      console.log(`Listening on port ${portNum}`);
    });
  }
);
