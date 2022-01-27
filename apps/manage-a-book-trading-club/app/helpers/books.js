'use strict';

const Book = require('../models/Book');

module.exports = (function BookHelpers() {
  function handleCreatedRequest(created) {
    return Book.update(
      { _id: { $in: created.takes } },
      { $push: { requests: created._id } },
      { multi: true });
  }

  return { handleCreatedRequest };
}());
