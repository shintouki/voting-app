'use strict';

var Users = require('../models/users.js');
var Polls = require('../models/polls.js');
var path = process.cwd();

function createPollId () {
    var charArr = [];
    var charChoices = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    var lenOfId = 10;
    for (var i=0; i<lenOfId; i++) {
    	charArr.push(charChoices.charAt(Math.floor(Math.random() * charChoices.length)));
    }

    return charArr.join('');
}

function UserPollsHandler () {

	this.getPolls = function (req, res) {
		Users
			.findOne({ 'twitter.id': req.user.twitter.id }, { '_id': false })
			.exec(function (err, result) {
				if (err) { throw err; }

				if (result) {
					res.json(result.userPolls);
				}

				
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
                optionText: optionsArr[i],
                optionCount: 0
			}
			optionObjectArr.push(currOption);
		}
		var pollId = createPollId();
		// console.log(pollId);

		Users
			.findOneAndUpdate({ 'twitter.id': req.user.twitter.id },
				{
					$push: {
					    'userPolls.pollIdList': pollId
					}
				})
			.exec(function (err, result) {
					if (err) { throw err; }
				}
			);

		Polls
			.create(
				{
					'title': req.body.pollTitle,
	        'options': optionObjectArr,
	        'pollId': pollId
				});
			
		res.redirect('/polldetails/' + pollId);
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
