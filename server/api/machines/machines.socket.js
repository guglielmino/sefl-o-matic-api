'use strict';

var self;

var MachineSocketioController = function(socketProvider) {
	this.sock = socketProvider;

	self = this;
};

/**
 * Notify to the machine about the change of configuration
 * @param serial {string} serial number of the machine where to send the new config
 * @param newConfig {object} configuration data
 */
MachineSocketioController.prototype.notifyConfigUpdate = function(serial, newConfig) {
	self.sock.sendTo(serial, 'config_update', newConfig);
};

/**
 * Send a simple command (ie. a command without any parameter) to a specific machine
 *
 * @param serial {string} serial number of the machine where to send the command
 * @param command {string} a command to be executed on the machine (eg 'snapshot', 'check', ...)
 */
MachineSocketioController.prototype.sendSimpleCommad = function(serial, command) {
    self.sock.sendTo(serial, command, {});
};

/**
 * Check if specified machine is online (ie active and with a socket connected to us)
 *
 * @param serial {string} serial number of the machine
 * @returns {boolean}
 */
MachineSocketioController.prototype.isOnlineMachine = function(serial) {
	var res = false;
	var onlineMachines = self.sock.getConnected();
	for (var propertyName in onlineMachines) {
		if (onlineMachines[propertyName] === "machine:" + serial) {
			res = true;
			break;
		}
	}

	return res;
};

module.exports = MachineSocketioController;