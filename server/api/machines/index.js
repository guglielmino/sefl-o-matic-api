'use strict';

var express = require('express');

module.exports = function(machinesProvider) {

  var router = express.Router();

  var MachineController = require('./machines.controller');
  var machinesController = new MachineController(machinesProvider);
  
  router.post('/', machinesController.addOrUpdateMachine);
  router.get('/:serialnumber', machinesController.getMachineBySerial);
  router.get('/:serialnumber/config', machinesController.getMachineConfig);
  router.post('/:serialnumber/config', machinesController.setMachineConfig);

  router.get('/', machinesController.index);

  return router;
}