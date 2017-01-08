'use strict';

var Polls = require('../models/polls.js');
var Users = require('../models/users.js');

function createPollId() {
    var charArr = [];
    var charChoices = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    var lenOfId = 10;
    for (var i=0; i<lenOfId; i++) {
      charArr.push(charChoices.charAt(Math.floor(Math.random() * charChoices.length)));
    }

    return charArr.join('');
}

function AddPollHandler() {
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
    var pollId = req.body.pollId;

    Polls
      .create(
        {
          'title': req.body.pollTitle,
          'options': optionObjectArr,
          'pollId': pollId
        });

    Users
      .findOneAndUpdate({ 'twitter.id': req.user.twitter.id },
        {
          $push: {
              'userPolls.pollIdList': pollId
          }
        })
      .exec(function (err, result) {
          if (err) {
            res.send(null, 500);
          }
          console.log(result.userPolls);
          // res.json(result.userPolls)
        }
      );

  res.redirect('/polldetail/' + pollId);

  };

}

module.exports = AddPollHandler;