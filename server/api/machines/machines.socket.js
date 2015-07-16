'use strict';

var self;

var MachineSocketioController = function(socketio)  {
	this.sock = socketio;

	self = this;
};


MachineSocketioController.prototype.notifyConfigUpdate = function(serial, newConfig){
	self.sock.sendTo(serial, 'config_update', newConfig);
};

module.exports = MachineSocketioController;
