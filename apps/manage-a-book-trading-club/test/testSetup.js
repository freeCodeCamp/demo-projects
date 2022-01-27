'use strict';

const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.resolve('./test/env') });

const mocha = require('mocha');
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const chaiHttp = require('chai-http');
const express = require('express');
const app = require('../app/app');
const User = require('../app/models/User');
const Book = require('../app/models/Book');
const Request = require('../app/models/Request');
const testData = require('../db/seeds');

const should = chai.should();
const { describe, it, before, beforeEach, after } = mocha;
const testUsers = testData.users;

// Set up app with logged in user
const mockApp = express();
const testUser = new User(testUsers[0]);
mockApp.use((req, res, next) => {
  req.isAuthenticated = (() => true);
  req.user = testUser;
  next();
});
mockApp.use(app);

chai.use(chaiHttp);
chai.use(chaiAsPromised);

before(() => testData.seedDb());

module.exports = {
  chai,
  app,
  User,
  Book,
  Request,
  testData,
  should,
  describe,
  it,
  before,
  beforeEach,
  after,
  mockApp,
};
