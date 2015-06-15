'use strict';

var util = require('util');
var validation = require('./machines.validation');
var errorMapper = require('./machine.controller.error');

var self;

var MachineController = function(storageProvider)  {
	this.storageProvider = storageProvider;
	self = this;
};

MachineController.prototype.index = function(req, res){
	console.log("DEBUG --- index");
	res.status(200).send("Self-O-Matic API");
};

MachineController.prototype.addOrUpdateMachine = function(req, res){

	var errors = validation.addOrUpdateMachine(req);
	if (errors) {
		res.send('There have been validation errors: ' + util.inspect(errors), 400);
		return;
	}

	self.storageProvider.addOrUpdateMachine(req.body).then(function(result) {
		console.log("result " + result);
		res.json(201, result);
	}, function(providerError) {
		console.log("err " + providerError.message);
		res
		.status(errorMapper.errorCodeToStatus(providerError.status))
		.send(providerError.message);
	});
};

MachineController.prototype.getMachineConfig = function(req, res){
	res.status(200).send("MachineConfig");
};

module.exports = MachineController;