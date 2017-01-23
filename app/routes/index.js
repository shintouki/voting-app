'use strict';

var path = process.cwd();
var PollHandler = require(path + '/app/controllers/pollHandler.server.js');

module.exports = function(app, passport) {

	function isLoggedIn(req, res, next) {
		if (req.isAuthenticated()) {
			return next();
		}
		else {
			res.redirect('/polls');
		}
	}

	var pollHandler = new PollHandler();

	app.route('*')
		.get(function(req, res, next) {
	  // Place user into res.locals for easy access from templates
	  res.locals.user = req.user || null;
	  next();
	});

	app.route('/polls')
		.get(function (req, res) {
			console.log("app.get('env')");
			console.log(app.get('env'));
			res.render('polls');
		});

	app.route('/polldetails/:pollid')
		.get(function (req, res) {
			var pollid = req.params.pollid;
			var data = {
				pollid: pollid
			}
			res.render('poll-details', data);
		});	

	app.route('/logout')
		.get(function (req, res) {
			req.logout();
			res.redirect('/polls');
		});

	app.route('/mypolls')
		.get(isLoggedIn, function (req, res) {
			res.render('my-polls');
		});

	app.route('/newpoll')
		.get(isLoggedIn, function (req, res) {
			res.render('new-poll');
		});

	app.route('/auth/twitter')
		.get(passport.authenticate('twitter'));

	app.route('/auth/twitter/callback')
		.get(passport.authenticate('twitter', {
			successRedirect: '/after-twitter-auth',
			failureRedirect: '/polls'
		}));

	app.route('/after-twitter-auth')
		.get(isLoggedIn, function (req, res) {
			res.render('after-twitter-auth');
		});

	app.route('/addpoll')
		.post(isLoggedIn, pollHandler.addPoll);

	app.route('/deletepoll')
		.delete(isLoggedIn, pollHandler.deletePoll);

	app.route('/vote')
		.post(pollHandler.votePoll);

	app.route('/api/allpolls')
		.get(pollHandler.getAllPolls);

	app.route('/api/:id')
		.get(isLoggedIn, function (req, res) {
			res.json(req.user.twitter);
		});

	app.route('/api/:id/polls')
		.get(isLoggedIn, pollHandler.getUserPollIds);

	app.route('*')
		.get(function (req, res) {
			res.redirect('/polls');
		});

};
