'use strict';

var express = require('express');
var passport = require('passport');
var config = require('../config/environment');

module.exports = function(usersProvider, socketio) {
	var router = express.Router();

	require('./local/passport').setup(usersProvider, config);
	router.use('/local', require('./local')(usersProvider));

	return router;
}