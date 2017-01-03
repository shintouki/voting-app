'use strict';

var path = process.cwd();
var UserPollsHandler = require(path + '/app/controllers/user-polls-handler.server.js');
var AllPollsHandler = require(path + '/app/controllers/all-polls-handler.server.js');

module.exports = function (app, passport) {

	function isLoggedIn (req, res, next) {
		if (req.isAuthenticated()) {
			return next();
		}
		else {
			res.redirect('/polls');
		}
	}

	var userPollsHandler = new UserPollsHandler();
	var allPollsHandler = new AllPollsHandler();

	app.route('*')
		.get(function(req, res, next) {
	  // Place user into res.locals for easy access from templates
	  res.locals.user = req.user || null;
	  next();
	});

	app.route('/polls')
		.get(function (req, res) {
			res.render('polls');
		});

	app.route('/polldetails/:pollid')
		.get(function (req, res) {
			var currpollid = req.params.pollid;

			var data = {
				pollid: currpollid
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

	app.route('/api/allpolls')
		.get(allPollsHandler.getPolls);

	app.route('/api/:id')
		.get(isLoggedIn, function (req, res) {
			res.json(req.user.twitter);
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

	app.route('/api/:id/polls')
		.get(isLoggedIn, userPollsHandler.getPolls)
		.post(isLoggedIn, userPollsHandler.addPoll);
		// .delete(isLoggedIn, clickHandler.deletePoll);

	app.route('*')
		.get(function (req, res) {
			res.redirect('/polls');
		});



};
