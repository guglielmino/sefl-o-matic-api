/**
 * Main application file
 */

'use strict';

// Set default node environment to development
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var express = require('express');
var config = require('./config/environment');
var chalk = require('chalk');
var fount = require('fount');
var events = require('events');
var eventEmitter = new events.EventEmitter();
var logger = require('./services/utils/logger');


// Setup server
var app = express();

// Initialize DI container
require('./bootstrap')(fount);

var server = require('http').createServer(app);

var socketio = require('socket.io')(server, {
  serveClient: true,
  path: '/socket.io'
});

var SocketProvider = require('./services/net/socketprovider');
var socketprovider = new SocketProvider(socketio);


// Storage providers
var MongoDBProvider = require('./services/storage/mongodb');
var storageProvider = new MongoDBProvider(config);


var WorkflowManager = require('./services/image_workflow/workflow_manager');
new WorkflowManager(eventEmitter, fount, storageProvider);

require('./config/express')(app);
require('./routes')(app, storageProvider, socketprovider, eventEmitter);

logger.info('Environment: ' + process.env.NODE_ENV);

// Start server
server.listen(config.port, config.ip, function () {
  console.log('Express server listening on %d, in %s mode', config.port, app.get('env'));
  logger.info('Express server listening on %d, in %s mode', config.port, app.get('env'));
});


// Expose app
exports = module.exports = app;