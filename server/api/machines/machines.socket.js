'use strict';

var self;

var MachineSocketioController = function(socketio)  {
	this.sock = socketio;

	self = this;
};


MachineSocketioController.prototype.notifyConfigUpdate = function(newConfig){
	self.sock.emit('config_update', newConfig);
};

module.exports = MachineSocketioController;
