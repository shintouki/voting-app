'use strict';

var Users = require('../models/users.js');
var path = process.cwd();

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
		var optionsString = req.body.pollOptions;
		var optionsArr = optionsString.split("\r\n");

		// If there is a newline at the very end, delete this from the array.
		if (optionsArr[optionsArr.length - 1] === "") {
			optionsArr = optionsArr.slice(0, optionsArr.length-1);
		}
		
		var optionObjectArr = [];
		for (var i=0; i<optionsArr.length; i++) {
			var currOption = {
				optionKey: i,
                optionText: optionsArr[1],
                optionCount: 0
			}
			optionObjectArr.push(currOption);
		}

		Users
			.findOneAndUpdate({ 'twitter.id': req.user.twitter.id },
				{
					$push: {
					    'userPolls.polls': {
					            'title': req.body.pollTitle,
					            'options': optionObjectArr
					    }
					}
				})
			.exec(function (err, result) {
					if (err) { throw err; }

					// res.json(result.userPolls);
					res.render(path + '/public/pollDetails.html', {});
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
