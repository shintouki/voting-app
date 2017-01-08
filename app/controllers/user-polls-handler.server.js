'use strict';

var Users = require('../models/users.js');

function UserPollsHandler() {
	
	this.getPolls = function(req, res) {
		Users
			.findOne({ 'twitter.id': req.user.twitter.id }, { '_id': false })
			.exec(function (err, result) {
				if (err) { throw err; }
				
				res.json(result.userPolls);
			});
	};

}

module.exports = UserPollsHandler;
