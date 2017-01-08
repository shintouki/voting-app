'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Poll = new Schema({
  userId: String,
  pollId: String,
  title: String,
  options: [{
      optionKey: Number,
      optionText: String,
      optionCount: Number
  }]
});

module.exports = mongoose.model('Poll', Poll);