'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Counters = new Schema ({
  count : {type: Number, default: 1}
});

module.exports = mongoose.model('Counters', Counters, 'counters');
