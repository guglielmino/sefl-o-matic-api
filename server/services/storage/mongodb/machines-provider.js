'use strict';

var Q = require('q');
var _ = require('lodash');
var models = require('./models');

var MachinesProvider = function(db) {
  this.db = db;
};

MachinesProvider.prototype.addOrUpdateMachine = function(machineData) {
  var deferred = Q.defer();

  console.log("DEBUG --- " + machineData);

  // TODO: Test if machineData or it must be esploded ({name : machineData["name"], ...})
  var machine = new models.Machines(machineData);

  machine.save(function (err, machine) {
    if (err) {
      deferred.reject(new Error(err));
    }
    else{
      deferred.resolve(machine);
    }
  });

  return deferred.promise;
};