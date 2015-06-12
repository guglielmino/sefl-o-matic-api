'use strict';

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
	self.storageProvider.addOrUpdateMachine(req.body).then(function(result) {
		console.log("result " + result);
		res.json(201, result);
	}, function(err) {
		console.log("err " + err.message);
		res.status(500).send(err.message);
	});
};

MachineController.prototype.getMachineConfig = function(req, res){
	res.status(200).send("MachineConfig");
};

module.exports = MachineController;