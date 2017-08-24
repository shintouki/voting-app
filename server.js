'use strict';

// Packages
var express = require('express');
var routes = require('./app/routes/index.js');
var mongoose = require('mongoose');
var passport = require('passport');
var session = require('express-session');
var path = require('path');
var bodyParser = require('body-parser');

var app = express();

// Enable dotenv if you want to run <node server.js> to run app locally
// require('dotenv').load();

// Passport middleware for auth
require('./app/config/passport')(passport);

// Mongoose - used to map data from mongoDB database to json object so
// it's more easily used in the server side code (handlers).
mongoose.connect(process.env.MONGO_URI);

// Pug middleware setup
app.set('views', process.cwd() + '/public')
app.set('view engine', 'pug')

// Serve static files with express static middleware function
app.use('/public', express.static(process.cwd() + '/public'));
app.use('/controllers', express.static(path.join(__dirname, '/app/controllers')));
app.use('/common', express.static(path.join(__dirname, '/app/common')));
app.use('/jquery', express.static(__dirname + '/node_modules/jquery/dist'));
app.use('/bootstrap/js', express.static(__dirname + '/node_modules/bootstrap/dist/js'));
app.use('/bootstrap/css', express.static(__dirname + '/node_modules/bootstrap/dist/css'));
app.use('/chartjs', express.static(__dirname + '/node_modules/chart.js/dist'));

// Express session middleware setup
// Session data is stored server-side.
// Express uses a cookie to store session id with encryption in the user's browser.
// Then on subsequent requests, express uses value of cookie to get session info
// stored on server.
// This makes it so express doesn't have to do additional requests to the server
// every time the user logs in.
app.use(session({
	secret: process.env.SESSION_SECRET,
	resave: false,
	saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());

// bodyParser middleware is used to make req.body work
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// I don't use this but this can also be used to check if user is logged in.
// app.use should go here, before routes because it attaches to the app's
// main middleware stack. It's used in the order specified by middleware
app.use(function (req, res, next) {
  res.locals.login = req.isAuthenticated();
  next();
});

routes(app, passport);

var port = process.env.PORT || 8080;
app.listen(port,  function () {
	console.log('Node.js listening on port ' + port + '...');
});