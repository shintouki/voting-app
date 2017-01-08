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

  this.getAllPolls = function (req, res) {
    Polls
      .find()
      .exec(function (err, result) {
        if (err) { throw err; }
        if (result) {
          // console.log("result......");
          // console.log(result);
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
          // console.log(result.userPolls);
          // res.json(result.userPolls)
        }
      );

  res.redirect('/polldetails/' + pollId);

  };

  this.deletePoll = function(req, res) {
    console.log("printing req.body in deletepoll....");
    console.log(req.body);
    var pollId = req.body.pollId;
    // alert("Are you sure you want to delete this poll?");
    
    Users
      .findOne({ 'twitter.id': req.user.twitter.id }, function (err, doc) {
        if (err) {
          res.send(null, 500);
        }
        else if (doc) {
          var userPollsArr = doc.userPolls.pollIdList;
          userPollsArr.splice(userPollsArr.indexOf(pollId), 1);
          // console.log(userPollsArr);
          // console.log(doc);
          // doc.save();
          doc.save(function(err, doc) {
            if (err) {
              res.send(null, 500);
            }
          })
        }
      });

    Polls
      .findOneAndRemove({ 'pollId': pollId }, function (err, doc) {
        if (err) {
          res.send(null, 500);
        }
      });

    // console.log("right before redirect");
    // res.redirect('/polls');
    // res.send("hello");
    // console.log(res);
    req.method = 'GET'
    // res.redirect('/polls');
  };

}

module.exports = PollHandler;