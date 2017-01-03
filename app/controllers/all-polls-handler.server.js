'use strict';

var Users = require('../models/users.js');
var Polls = require('../models/polls.js');

function createPollId() {
    var charArr = [];
    var charChoices = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    var lenOfId = 10;
    for (var i=0; i<lenOfId; i++) {
      charArr.push(charChoices.charAt(Math.floor(Math.random() * charChoices.length)));
    }

    return charArr.join('');
}

function AllPollsHandler() {
  this.getPolls = function (req, res) {
    Polls
      .find()
      .exec(function (err, result) {
        if (err) { throw err; }
        if (result) {
          res.json(result);
        }
      });
  };
}


module.exports = AllPollsHandler;