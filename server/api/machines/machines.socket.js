'use strict';

var self;

var MachineSocketioController = function(socketProvider) {
	this.sock = socketProvider;

	self = this;
};


MachineSocketioController.prototype.notifyConfigUpdate = function(serial, newConfig) {
	self.sock.sendTo(serial, 'config_update', newConfig);
};

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