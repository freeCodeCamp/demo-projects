'use strict';

const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const tradeSchema = new Schema({
  description: String,
  accepter: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  requester: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  takes: [{
    name: {
      type: String,
      required: true,
    },
    description: String,
  }],
  gives: [{
    name: {
      type: String,
      required: true,
    },
    description: String,
  }],
});

try {
  mongoose.model('Trade', tradeSchema);
  // eslint-disable-next-line no-empty
} catch (err) {}

module.exports = mongoose.model('Trade');

