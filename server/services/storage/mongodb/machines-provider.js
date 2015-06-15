'use strict';

var Q = require('q');
var _ = require('lodash');
var Machine = require('./models/machine');
var errorHandler = require('./error.handler');

var MachinesProvider = function(db) {
  this.db = db;
};

MachinesProvider.prototype.addOrUpdateMachine = function(machineData) {
  var deferred = Q.defer();

  var machine = new Machine(machineData);

  machine.save(function (err) {
    if (err) {
      deferred.reject(errorHandler.getDecodedError(err));
    }
    else{
      deferred.resolve(machine);
    }
  });

  return deferred.promise;
};

module.exports = MachinesProvider;