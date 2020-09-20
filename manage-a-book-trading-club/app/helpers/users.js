'use strict';

const User = require('../models/User');

module.exports = (function UserHelpers() {
  function handleCreatedRequest(created) {
    return User.update(
      { books: { $in: created.takes } },
      { $push: { receivedRequests: created._id } },
      { multi: true });
  }

  return { handleCreatedRequest };
}());
