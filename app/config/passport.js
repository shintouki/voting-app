'use strict';

var TwitterStrategy = require('passport-twitter').Strategy;
var User = require('../models/users');
var configAuth = require('./auth');

module.exports = function (passport) {
	// passport.serializeUser(function (user, done) {
	// 	done(null, user.id);
	// });

	// passport.deserializeUser(function (id, done) {
	// 	User.findById(id, function (err, user) {
	// 		done(err, user);
	// 	});
	// });

	passport.serializeUser(function(user, cb) {
	  cb(null, user);
	});

	passport.deserializeUser(function(obj, cb) {
	  cb(null, obj);
	});

	passport.use(new TwitterStrategy({
		consumerKey: configAuth.twitterAuth.consumerKey,
		consumerSecret: configAuth.twitterAuth.consumerSecret,
		callbackURL: configAuth.twitterAuth.callbackURL
	},
	function (token, tokenSecret, profile, done) {
		console.log(profile);
		process.nextTick(function () {
			User.findOne({ 'twitter.id': profile.id }, function (err, user) {
				if (err) {
					return done(err);
				}

				if (user) {
					return done(null, user);
				} else {
					var newUser = new User();

					newUser.twitter.id = profile.id;
					newUser.twitter.displayName = profile.displayName;
				
					// newUser.twitter.username = profile.username;
					// newUser.twitter.displayName = profile.displayName;
					// newUser.twitter.publicRepos = profile._json.public_repos;
					// newUser.nbrClicks.clicks = 0;

					newUser.save(function (err) {
						if (err) {
							throw err;
						}

						return done(null, newUser);
					});
				}
			});
		});
	}));
};
