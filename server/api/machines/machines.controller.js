'use strict';

var util = require('util');
var validation = require('./machines.validation');
var errorMapper = require('../../services/helpers/controller.error');

var self;

var MachineController = function(storageProvider, machineSocketController)  {
	this.storageProvider = storageProvider;
	this.socketController = machineSocketController;
	self = this;
};

MachineController.prototype.index = function(req, res){
	self.storageProvider.getMachines()
		.then(function(result) {
			if(result){
				res.json(200, result);
			}
			else{
				res.status(404).send();
			}

		}, function(providerError) {
			console.log("err " + providerError.message);
			res
				.status(errorMapper.errorCodeToStatus(providerError.status))
				.send(providerError.message);
		});
};

MachineController.prototype.addOrUpdateMachine = function(req, res){

	var errors = validation.addOrUpdateMachine(req);
	if (errors) {
		res.send('There have been validation errors: ' + util.inspect(errors), 400);
		return;
	}

	self.storageProvider.addOrUpdateMachine(req.body)
		.then(function(result) {
			console.log("result " + result);
			res.json(201, result);
		}, function(providerError) {
			console.log("err " + providerError.message);
			res
				.status(errorMapper.errorCodeToStatus(providerError.status))
				.send(providerError.message);
		});
};

MachineController.prototype.getMachineBySerial = function(req, res) {
	var serial = req.params.serialnumber;

	self.storageProvider.getMachineBySerial(serial).then(function(result) {
		if(result){
			res.json(200, result);
		}
		else{
			res.status(404).send();
		}

	}, function(providerError) {
		console.log("err " + providerError.message);
		res
		.status(errorMapper.errorCodeToStatus(providerError.status))
		.send(providerError.message);
	});
};

MachineController.prototype.getMachineConfig = function(req, res){
	var serial = req.params.serialnumber;

	self.storageProvider.getMachineBySerial(serial).then(function(result) {
		if(result && result.config){
			res.json(200, result.config);
		}
		else{
			res.status(404).send();
		}

	}, function(providerError) {
		console.log("err " + providerError.message);
		res
		.status(errorMapper.errorCodeToStatus(providerError.status))
		.send(providerError.message);
	});
};

MachineController.prototype.setMachineConfig = function(req, res) {
	var serial = req.params.serialnumber;
	var configData = req.body;

	self.storageProvider.saveMachineConfig(serial, configData).then(function(result) {
		if(result){
			// WebSocket notify
			self.socketController.notifyConfigUpdate(serial, result.config);
			res.json(200, result.config);
		}
		else{
			res.status(404).send();
		}
	}, function(providerError) {
		console.log("err " + providerError.message);
		res
		.status(errorMapper.errorCodeToStatus(providerError.status))
		.send(providerError.message);
	});
};

module.exports = MachineController;