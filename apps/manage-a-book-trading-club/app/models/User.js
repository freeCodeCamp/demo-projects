'use strict';

const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  provider: {
    type: String,
    required: true,
  },
  providerId: {
    type: String,
    required: true,
  },
  /* google: {
    id: String,
    displayName: String,
  },
  github: {
    id: String,
    displayName: String,
    username: String,
  }, */
  fullName: String,
  city: {
    type: String,
    default: 'an unspecified location',
  },
  state: String,
  address: String,
  books: [{
    type: Schema.Types.ObjectId,
    ref: 'Book',
    required: true,
  }],
  receivedRequests: [{
    type: Schema.Types.ObjectId,
    ref: 'Request',
    required: true,
  }],
  trades: [{
    type: Schema.Types.ObjectId,
    ref: 'Trades',
    required: true,
  }],
});

// userSchema.methods.getBooks = function getBooks() {
//   // eslint-disable-next-line no-underscore-dangle
//   return Book.find({ owner: this._id });
// };

// Mocha --watch breaks the require cache and mongoose will throw
// an error trying to initialize an model twice, so ignore this error
try {
  mongoose.model('User', userSchema);
  // eslint-disable-next-line no-empty
} catch (err) {}

module.exports = mongoose.model('User');
