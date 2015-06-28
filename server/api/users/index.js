'use strict';

var express = require('express');

module.exports = function(usersProvider, socketio) {

  var router = express.Router();

  var AuthService = require('../../auth/auth.service')
  var auth = new AuthService(usersProvider);

  var UserController = require('./user.controller');
  var usersController = new UserController(usersProvider);
  

  router.get('/', auth.hasRole('admin'), usersController.index);
  router.delete('/:id', auth.hasRole('admin'), usersController.destroy);
  router.get('/me', auth.isAuthenticated(), usersController.me);
  router.put('/:id/password', auth.isAuthenticated(), usersController.changePassword);
  router.get('/:id', auth.isAuthenticated(), usersController.show);
  router.post('/', usersController.create);


  return router;
}