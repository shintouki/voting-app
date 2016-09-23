'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var User = new Schema({
	twitter: {
		id: String,
		screen_name: String,
		name: String,
      publicRepos: Number
	},
   nbrClicks: {
      clicks: Number
   }
});

module.exports = mongoose.model('User', User);
