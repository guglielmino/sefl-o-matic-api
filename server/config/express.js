/**
 * Express configuration
 */

'use strict';

var express = require('express');
var morgan = require('morgan');
var compression = require('compression');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var cookieParser = require('cookie-parser');
var errorHandler = require('errorhandler');
var path = require('path');
var expressValidator = require('express-validator');
var config = require('./environment');
var favicon = require('serve-favicon');
var busboy = require('connect-busboy'); //middleware for form/file upload


module.exports = function(app) {
  var env = app.get('env');

  app.use(compression());
  app.use(bodyParser.urlencoded({
    extended: false
  }));
  app.use(bodyParser.json());
  app.use(expressValidator());
  app.use(methodOverride());
  app.use(cookieParser());
  app.use(busboy());


  // Setting the app router and static folder
  app.use('/static/docs', express.static(path.resolve('./docs')));
  console.log('STATIC -->' + path.resolve('./docs'));

  if ('production' === env) {
    app.use(favicon(path.join(config.root, 'public', 'favicon.ico')));
    app.use(express.static(path.join(config.root, 'public')));
    app.set('appPath', config.root + '/public');
    app.use(morgan('dev'));
  }

  if ('development' === env || 'test' === env) {
    app.use(require('connect-livereload')());
    app.use(express.static(path.join(config.root, '.tmp')));
    app.use(express.static(path.join(config.root, 'client')));
    app.set('appPath', 'client');
  
    app.use(morgan('dev'));
    app.use(errorHandler()); // Error handler - has to be last
  }

};