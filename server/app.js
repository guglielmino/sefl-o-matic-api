/**
 * Main application file
 */

'use strict';

// Set default node environment to development
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var express = require('express');
var config = require('./config/environment');
var chalk = require('chalk');

var MongoDBProvider = require('./services/storage/mongodb');
var storageProvider = new MongoDBProvider(config);

// Setup server
var app = express();
var server = require('http').createServer(app);


require('./config/express')(app);
require('./routes')(app, storageProvider);

console.log(chalk.green('Environment: ' + process.env.NODE_ENV));

// Start server
server.listen(config.port, config.ip, function () {
  console.log('Express server listening on %d, in %s mode', config.port, app.get('env'));
});

// Expose app
exports = module.exports = app;