'use strict';

var express = require('express');

module.exports = function(machinesProvider, usersProvider, socketio, eventEmitter) {

  var router = express.Router();

  var MachineSocketController = require('./machines.socket');
  var machineSocketController = new MachineSocketController(socketio);

  var MachineController = require('./machines.controller');
  var machinesController = new MachineController(machinesProvider, machineSocketController);

  var UploadController = require('./upload/upload.controller');
  var uploadController = new UploadController(machineSocketController, eventEmitter);

  var AuthService = require('../../auth/auth.service')
  var auth = new AuthService(usersProvider);
  
  router.post('/', machinesController.addOrUpdateMachine);
  router.get('/:serialnumber', machinesController.getMachineBySerial);
  router.get('/:serialnumber/config', machinesController.getMachineConfig);
  router.post('/:serialnumber/config', machinesController.setMachineConfig);
  router.post('/:serialnumber/upload', uploadController.uploadImage);

  router.get('/', auth.isAuthenticated(), machinesController.index);

  return router;
}