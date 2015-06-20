'use strict';

var express = require('express');

module.exports = function(machinesProvider, socketio) {

  var router = express.Router();

  var MachineSocketController = require('./machines.socket');
  var machineSocketController = new MachineSocketController(socketio);

  var MachineController = require('./machines.controller');
  var machinesController = new MachineController(machinesProvider, machineSocketController);
  
  router.post('/', machinesController.addOrUpdateMachine);
  router.get('/:serialnumber', machinesController.getMachineBySerial);
  router.get('/:serialnumber/config', machinesController.getMachineConfig);
  router.post('/:serialnumber/config', machinesController.setMachineConfig);

  router.get('/', machinesController.index);

  return router;
}