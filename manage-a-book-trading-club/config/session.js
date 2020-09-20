'use strict';

const session = require('express-session');
const connectMongo = require('connect-mongo');
const connection = require('../db/connection');

const db = connection(process.env.MONGO_URI);
const MongoStore = connectMongo(session);

module.exports = session({
  secret: 'kfsvvxbbf',
  resave: false,
  saveUninitialized: false,
  store: new MongoStore({ mongooseConnection: db }),
});
