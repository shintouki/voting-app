'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Declare data type for user properties
// userPolls is an array of objects, each poll
var User = new Schema({
	twitter: {
		id: String,
		displayName: String
	},
	userPolls: {
		polls: [{
            title: String,
            options: [{
                optionKey: Number,
                optionText: String,
                optionCount: Number
            }]
        }]
	}
});

module.exports = mongoose.model('User', User);