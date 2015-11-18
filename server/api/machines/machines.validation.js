'use strict';

module.exports = {

  addMachine: function(req) {

    req.checkBody('name', 'Param "name" is missing or invalid.').notEmpty();
    req.checkBody('serial', 'Param "serial" is missing or invalid.').notEmpty();

    return req.validationErrors();
  }
}