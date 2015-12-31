'use strict';

var util = require('util');
var validation = require('./machines.validation');
var errorMapper = require('../../services/helpers/controller.error');

var self;

var MachineController = function(storageProvider, machineSocketController) {
	this.storageProvider = storageProvider;
	this.socketController = machineSocketController;
	self = this;
};

/**
 * Get all machines registered
 * @param req
 * @param res
 */
MachineController.prototype.index = function(req, res) {
	self.storageProvider.getMachines()
		.then(function(result) {
				if (result) {
					for (var idx in result) {
						result[idx].isOn = self
							.socketController
							.isOnlineMachine(result[idx].serial);
					}

					res.status(200).json(result);
				} else {
					res.status(404).send();
				}

			},
			function(providerError) {
				console.log("err " + providerError.message);
				res
					.status(errorMapper.errorCodeToStatus(providerError.status))
					.send(providerError.message);
			});
};

/**
 * Register a new machine
 * @param req
 * @param res
 */
MachineController.prototype.addMachine = function(req, res) {

	var errors = validation.addMachine(req);
	if (errors) {
		res.send('There have been validation errors: ' + util.inspect(errors), 400);
		return;
	}

	var remote_ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
	self.storageProvider.addMachine(req.body, remote_ip)
		.then(function(result) {
			res.status(201).json(result);
		}, function(providerError) {
			console.log("err " + providerError.message);
			res
				.status(errorMapper.errorCodeToStatus(providerError.status))
				.send(providerError.message);
		});
};

/**
 * Get machine's data using it's serial as identifier
 * @param req
 * @param res
 */
MachineController.prototype.getMachineBySerial = function(req, res) {
	var serial = req.params.serialnumber;

	self.storageProvider.getMachineBySerial(serial).then(function(result) {
		if (result) {
			res.status(200).json(result);
		} else {
			res.status(404).send();
		}

	}, function(providerError) {
		console.log("err " + providerError.message);
		res
			.status(errorMapper.errorCodeToStatus(providerError.status))
			.send(providerError.message);
	});
};

/**
 * Get machine's configuration data using it's serial as identifier
 * @param req
 * @param res
 */
MachineController.prototype.getMachineConfig = function(req, res) {
	var serial = req.params.serialnumber;

	self.storageProvider.getMachineBySerial(serial)
		.then(function(result) {
		if (result && result.config) {
			res.status(200).json(result.config);
		} else {
			res.status(404).send();
		}

	}, function(providerError) {
		console.log("err " + providerError.message);
		res
			.status(errorMapper.errorCodeToStatus(providerError.status))
			.send(providerError.message);
	});
};

/**
 * Remove a machine identified by serial number
 * @param req
 * @param res
 */
MachineController.prototype.deleteMachineBySerial = function (req, res) {
	var serial = req.params.serialnumber;

	self.storageProvider
		.deleteMachineBySerial(serial)
		.then(function(result) {
		if (result) {
			res.status(200).send();
		} else {
			res.status(404).send();
		}

	}, function(providerError) {
		console.log("err " + providerError.message);
		res
			.status(errorMapper.errorCodeToStatus(providerError.status))
			.send(providerError.message);
	});
};

/**
 * Update machine config data
 * @param req
 * @param res
 */
MachineController.prototype.setMachineConfig = function(req, res) {
	var serial = req.params.serialnumber;
	var configData = req.body;

	self.storageProvider.saveMachineConfig(serial, configData).then(function(result) {
		if (result) {
			// WebSocket notify
			self.socketController.notifyConfigUpdate(serial, result.config);
			res.status(200).json(result.config);
		} else {
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