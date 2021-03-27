'use strict';

const {
  User,
  describe,
  it,
  testData,
} = require('./testSetup');

const testUsers = testData.users;

describe('User', () => {
  it('should eventually count all the test users', () =>
    User.count({}).should.eventually.equal(testUsers.length));
});
