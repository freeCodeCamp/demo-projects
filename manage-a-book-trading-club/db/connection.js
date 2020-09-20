'use strict';

const mongoose = require('mongoose');

// Set up mongoose connection
function connection(dbUrl) {
  mongoose.Promise = global.Promise;
  mongoose.connect(dbUrl, { 
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
  const db = mongoose.connection;
  db.on('error', console.error);
  return db;
}

module.exports = connection;

