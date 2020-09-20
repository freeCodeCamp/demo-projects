'use strict';

const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const bookSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: String,
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  requests: [{
    type: Schema.Types.ObjectId,
    ref: 'Request',
    required: true,
  }],
});

// bookSchema.methods.getTakeRequests = function getTakeRequests() {
//   // eslint-disable-next-line no-underscore-dangle
//   return Request.find({ takes: this._id });
// };
//
// bookSchema.methods.getGiveRequests = function getGiveRequests() {
//   // eslint-disable-next-line no-underscore-dangle
//   return Request.find({ gives: this._id });
// };

// Mocha --watch breaks the require cache and mongoose will throw
// an error trying to initialize an model twice, so ignore this error
try {
  mongoose.model('Book', bookSchema);
  // eslint-disable-next-line no-empty
} catch (err) {}

module.exports = mongoose.model('Book');
