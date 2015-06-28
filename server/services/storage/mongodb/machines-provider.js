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

MachinesProvider.prototype.getMachines = function(){
  var deferred = Q.defer();

  Machine.find({}, function(err, machines) {
    if (err) {
      deferred.reject(errorHandler.getDecodedError(err));
    }
    else{
      deferred.resolve(machines);
    }
  });

  return deferred.promise;
};

MachinesProvider.prototype.getMachineBySerial = function(serial) {
  var deferred = Q.defer();

  Machine.findOne({ 'serial': serial }, function (err, machine) {
    if (err) {
      deferred.reject(errorHandler.getDecodedError(err));
    }
    else{
      deferred.resolve(machine);
    }
  });

  return deferred.promise;
};

MachinesProvider.prototype.saveMachineConfig = function(serial, configData) {
  var deferred = Q.defer();

  Machine.findOne({ 'serial': serial }, function (err, machine) {
    if (err) {
      deferred.reject(errorHandler.getDecodedError(err));
    }
    else {
      if(machine){
        machine.config = configData;

        machine.save(function (err) {
          if (err) {
            deferred.reject(errorHandler.getDecodedError(err));
          }
          else{
            deferred.resolve(machine);
          }
        });
      }
      else{ 
        deferred.reject({ 'status' : 'NotFound', 'message' : ''});
      }
    }
  });

  return deferred.promise;
};

module.exports = MachinesProvider;