'use strict';

var path = process.cwd();
var UserPollsHandler = require(path + '/app/controllers/userPollsHandler.server.js');

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

	app.route('/polls')
		.get(function (req, res) {
			res.render(path + '/public/polls.html');
		});

	app.route('/polldetails/:pollId')
		.get(isLoggedIn, function (req, res) {
			res.render(path + '/public/poll-details.html', {
				pollId: req.params.pollId
			});
		});

	app.route('/logout')
		.get(function (req, res) {
			req.logout();
			res.redirect('/polls');
		});

	app.route('/mypolls')
		.get(isLoggedIn, function (req, res) {
			res.render(path + '/public/my-polls.html');
		});

	app.route('/newpoll')
		.get(isLoggedIn, function (req, res) {
			res.render(path + '/public/new-poll.html');
		});

	app.route('/api/:id')
		.get(isLoggedIn, function (req, res) {
			res.json(req.user.twitter);
		});

	// app.route('/api/polls')
	// 	.get(isLoggedIn, function (req, res) {
	// 		res.json(req.user.userPolls);
	// 	});

	app.route('/auth/twitter')
		.get(passport.authenticate('twitter'));

	app.route('/auth/twitter/callback')
		.get(passport.authenticate('twitter', {
			successRedirect: '/after-twitter-auth',
			failureRedirect: '/polls'
		}));

	app.route('/after-twitter-auth')
		.get(isLoggedIn, function (req, res) {
			res.render(path + '/public/after-twitter-auth.html');
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
