'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Declare data type for user properties
var User = new Schema({
	twitter: {
		id: String,
		displayName: String
	},
	userPolls: {
		pollIdList: [String]
	}
});

module.exports = mongoose.model('User', User);