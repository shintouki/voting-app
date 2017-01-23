'use strict';

var Polls = require('../models/polls.js');
var Users = require('../models/users.js');
var appUrl = process.env.APP_URL

function createPollId() {
    var charArr = [];
    var charChoices = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    var lenOfId = 10;
    for (var i=0; i<lenOfId; i++) {
      charArr.push(charChoices.charAt(Math.floor(Math.random() * charChoices.length)));
    }

    return charArr.join('');
}

function PollHandler() {

  this.getAllPolls = function(req, res) {
    // console.log("req.user...");
    // console.log(req.user);
    Polls
      .find()
      .exec(function (err, result) {
        if (err) { throw err; }
        if (result) {
          var resultObj = {};
          for (var i=0; i<result.length; i++) {
            var pollId = result[i]['pollId'];
            resultObj[pollId] = result[i];
          }
   
          res.json(resultObj);
        }
      });
  };

  this.getUserPollIds = function(req, res) {
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

    function removeDuplicates(arr) {
      var seen = {};
      var retArr = [];
      var j = 0;
      for (var i=0; i<arr.length; i++) {
        var item = arr[i];
        if (seen[item] !== 1) {
          retArr[j++] = item;
          seen[item] = 1;
        }
      }
      return retArr;
    }

    optionsArr = removeDuplicates(optionsArr);
    
    var optionObjectArr = [];
    for (var i=0; i<optionsArr.length; i++) {
      // Skip if option is empty, it means it was a blank line
      if (optionsArr[i] === "") {
        continue;
      }

      var currOption = {
        optionText: optionsArr[i],
        optionCount: 0
      }
      optionObjectArr.push(currOption);
    }
    var pollId = createPollId();

    Polls
      .create(
        {
          'userId': req.user.twitter.id,
          'pollId': pollId,
          'title': req.body.pollTitle,
          'options': optionObjectArr
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
        }
      );

  res.redirect('/polldetails/' + pollId);

  };

  this.deletePoll = function(req, res) {
    var pollId = req.body.pollId;
    
    Users
      .findOne({ 'twitter.id': req.user.twitter.id }, function(err, doc) {
        if (err) {
          res.send(null, 500);
        }
        else if (doc) {
          var userPollsArr = doc.userPolls.pollIdList;
          userPollsArr.splice(userPollsArr.indexOf(pollId), 1);

          doc.save(function(err, doc) {
            if (err) {
              res.send(null, 500);
            }
          })
        }
      });

    Polls
      .findOneAndRemove({ 'pollId': pollId }, function(err, doc) {
        if (err) {
          res.send(null, 500);
        }
      });

  };

  this.votePoll = function(req, res) {
    var choice = req.body.choice;
    var pollId = req.query.pollid;

    Polls
      .findOne({ 'pollId': pollId }, function(err, doc) {
        if (err) {
          res.send(null, 500);
        }
        else if (doc) {
          var options = doc.options;
          var choiceFound = false;
          for (var i=0; i<options.length; i++) {
            if (options[i].optionText == choice) {
              options[i].optionCount++;
              choiceFound = true;
            }
          }

          if (!choiceFound) {
            // Create new option if choice not found
            var newOption = {
              optionText: choice,
              optionCount: 1
            }
            options.push(newOption);
          }

          doc.save(function(err, doc) {
            if (err) {
              res.send(null, 500);
            }
          })

        }
      });

    res.redirect('/polldetails/' + pollId);
  };

}

module.exports = PollHandler;