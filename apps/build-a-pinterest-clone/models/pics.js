'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Pic = new Schema({
  url: {type: String, required: true},
  description: String,
  date: {type: Date, default: Date.now },
  ownerId: {type: Schema.Types.ObjectId, required: true, ref: 'User'},
  likers: [Schema.Types.ObjectId]
});

module.exports = mongoose.model('Pic', Pic);

