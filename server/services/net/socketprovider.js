'use strict';

var Q = require('q');

var self;

var SocketProvider = function(socketio) {
	
	this.sock = socketio;

	this.sock.on('connection', function (socket) {
	    socket.address = socket.handshake.address !== null ?
	            socket.handshake.address + ':' + socket.handshake.address.port :
	            process.env.DOMAIN;

	    socket.connectedAt = new Date();

	    // Call onDisconnect.
	    socket.on('disconnect', function () {
	      self.onDisconnect(socket);
   		});

	    // Call onConnect.
	    self.onConnect(socket);

	    socket.on('register', function(data) {
	    	var serial = JSON.stringify(data, null, 2);
	    	// Subscribe a room identified by client serial 
	    	// pattern machine:serial
	    	socket.join("machine:" + data);
	    });
 

  });

  self = this;
};


SocketProvider.prototype.onConnect = function(socket){
	console.info('[%s] PROVIDER CONNECTED', socket.id);
};

SocketProvider.prototype.onDisconnect = function(socket){
	console.info('[%s] PROVIDER DISCONNECTED', socket.id);
};

/**
* sendTo - send a realtime event to a socket associated to a serial
*
* @param {String} serial
* @param {String} event
* @param {Object} data
* @return {Boolean}
* @api public
*/
SocketProvider.prototype.sendTo = function(serial, event, data) {
	var roomName = "machine:" + serial;
	console.log("sentTo room " + roomName);
	self.sock.to(roomName).emit(event, data);
};

/**
* sendBroadcast - send a event to all connected machines
*
* @return {String}
* @api public
*/
SocketProvider.prototype.sendBroadcast = function(event, data) {
	this.sock.emit(event, data);
};

/**
* Encrypt password
*
* @param {String} password
* @return {Promise}
* @api public
*/
SocketProvider.prototype.on = function(event, cb) {
	self.sock.on(event, cb);
};


module.exports = SocketProvider;

