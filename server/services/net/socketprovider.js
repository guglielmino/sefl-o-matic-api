'use strict';

var Q = require('q');

var self;
var connectedMachines = {};

var SocketProvider = function(socketio) {

	this.sock = socketio;

	this.sock.on('connection', function(socket) {
		socket.address = socket.handshake.address !== null ?
			socket.handshake.address + ':' + socket.handshake.address.port :
			process.env.DOMAIN;

		socket.connectedAt = new Date();

		// Call onDisconnect.
		socket.on('disconnect', function() {
			self.onDisconnect(socket);
		});

		// Call onConnect.
		self.onConnect(socket);

		socket.on('register', function(data) {
			var serial = JSON.stringify(data, null, 2);
			// Subscribe a room identified by client serial 
			// pattern machine:serial
			var roomName = "machine:" + data;

			socket.join(roomName);
			connectedMachines[socket.id] = roomName;

			self.onRegistered(socket, roomName);
		});


	});

	self = this;
};

/**
 * Callback called on a new machine registration
 *
 * @param socket
 * @param roomName
 */
SocketProvider.prototype.onRegistered = function(socket, roomName) {
	console.info('[%s] CLIENT REGISTERED %s', socket.id, roomName);
	this.sendBroadcast('registered', roomName);

};

/**
 * onConnect - event fired when a client connect
 *
 * @param {Object} socket
 * @api public
 */
SocketProvider.prototype.onConnect = function(socket) {
	console.info('[%s] PROVIDER CONNECTED', socket.id);
};

/**
 * onDisconnect - event fired when a client disconnect
 *
 * @param {Object} socket
 * @api public
 */
SocketProvider.prototype.onDisconnect = function(socket) {
	console.info('[%s] PROVIDER DISCONNECTED', socket.id);
	if (socket.id in connectedMachines) {
		console.info("LEAVE OF %s", connectedMachines[socket.id]);
		this.sendBroadcast('unregistered', connectedMachines[socket.id]);
		delete connectedMachines[socket.id];
	}
	for (var idx in socket.rooms) {
		console.info("Subscribed to room %s", socket.rooms[idx]);
	}
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
	console.log("sendBroadcast  " + event);
	self.sock.emit(event, data);
};

/**
 * Register a callback on a specific event
 *
 * @param event
 * @param cb
 */
SocketProvider.prototype.on = function(event, cb) {
	self.sock.on(event, cb);
};

/**
 * Get a list of connected machines
 *
 * @returns {{}}
 */
SocketProvider.prototype.getConnected = function() {
	return connectedMachines;
};


module.exports = SocketProvider;