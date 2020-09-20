'use strict';

const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const requestSchema = new Schema({
  description: String,
  requester: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  takes: [{
    type: Schema.Types.ObjectId,
    ref: 'Book',
    required: true,
  }],
  gives: [{
    type: Schema.Types.ObjectId,
    ref: 'Book',
    required: true,
  }],
});

try {
  mongoose.model('Request', requestSchema);
  // eslint-disable-next-line no-empty
} catch (err) {}

module.exports = mongoose.model('Request');
