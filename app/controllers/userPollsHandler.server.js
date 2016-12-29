'use strict';

var Users = require('../models/users.js');

function UserPollsHandler () {

	this.getPolls = function (req, res) {
		Users
			.findOne({ 'twitter.id': req.user.twitter.id }, { '_id': false })
			.exec(function (err, result) {
				if (err) { throw err; }

				res.json(result.userPolls);
			});
	};

	this.addPoll = function (req, res) {
		Users
			.findOneAndUpdate({ 'twitter.id': req.user.twitter.id },
				{  
					$push: {
					    'userPolls.polls': {
					            'title': "first poll",
					            'options': "a b c"
					    }
					}
				})
			.exec(function (err, result) {
					if (err) { throw err; }

					res.json(result.userPolls);
				}
			);
	};

	// this.deletePoll = function (req, res) {
	// 	Users
	// 		.findOneAndUpdate({ 'twitter.id': req.user.twitter.id }, { 'userPolls.polls': [] })
	// 		.exec(function (err, result) {
	// 				if (err) { throw err; }

	// 				res.json(result.userPolls);
	// 			}
	// 		);
	// };

}

module.exports = UserPollsHandler;
