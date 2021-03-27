'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UrlEntries = new Schema ({
  url : {type: String, required: true},
  index : {type: Number, required: true}
});

module.exports = mongoose.model('UrlEntries', UrlEntries, 'url_entries');
