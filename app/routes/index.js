'use strict';

var path = process.cwd();
var ClickHandler = require(path + '/app/controllers/clickHandler.server.js');

module.exports = function (app, passport) {

	function isLoggedIn (req, res, next) {
		if (req.isAuthenticated()) {
			return next();
		} else {
			res.redirect('/polls-not-logged-in');
		}
	}

	var clickHandler = new ClickHandler();

	app.route('/polls-not-logged-in')
		.get(function (req, res) {
			res.sendFile(path + '/public/polls-not-logged-in.html');
		});

	app.route('/polls-logged-in')
		.get(isLoggedIn, function (req, res) {
			res.sendFile(path + '/public/polls-logged-in.html');
		});

	app.route('/logout')
		.get(function (req, res) {
			req.logout();
			res.redirect('/polls-not-logged-in');
		});

	app.route('/mypolls')
		.get(isLoggedIn, function (req, res) {
			res.sendFile(path + '/public/my-polls.html');
		});

	app.route('/newpoll')
		.get(isLoggedIn, function (req, res) {
			res.sendFile(path + '/public/new-poll.html');
		});

	app.route('/api/:id')
		.get(isLoggedIn, function (req, res) {
			res.json(req.user.twitter);
		});

	app.route('/auth/twitter')
		.get(passport.authenticate('twitter'));

	app.route('/auth/twitter/callback')
		.get(passport.authenticate('twitter', {
			successRedirect: '/after-twitter-auth',
			failureRedirect: '/polls-not-logged-in'
		}));

	app.route('/after-twitter-auth')
		.get(isLoggedIn, function (req, res) {
			res.sendFile(path + '/public/after-twitter-auth.html');
		});

	app.route('/api/:id/polls')
		.get(isLoggedIn, clickHandler.getClicks)
		.post(isLoggedIn, clickHandler.addClick)
		.delete(isLoggedIn, clickHandler.resetClicks);

	// app.use(function (req, res, next) {
	// 	res.locals.login = req.isAuthenticated();
	// 	next();
	// });

	app.route('*')
		.get(function (req, res) {
			res.redirect('/polls-logged-in');
		});

};
