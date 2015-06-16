'use strict';

var should = require('should');
var app = require('../../app');
var request = require('supertest');
var chalk = require('chalk');

describe('Machines controller', function() {

  it('create machine if not exists', function(done) {
    var machineData = {
      serial: "12345",
      name: "Machine host name"
    };

    request(app)
    .post('/api/machines/')
    .send(machineData)
    .expect(201)
    .end(function(err, res) {
      if (err) {
        return done(err);
      }
      done();
    });
  });

  it('returns 400 if serial is empty', function(done) {
    var machineData = {
      serial: "",
      name: "Machine host name"
    };

    request(app)
    .post('/api/machines/')
    .send(machineData)
    .expect(400)
    .end(function(err, res) {
      if (err) {
        return done(err);
      }
      done();
    });
  });

  it('returns 304 if machines serial is already stored', function(done) {
    var machineData = {
      serial: "12345",
      name: "Machine host name"
    };

    request(app)
    .post('/api/machines/')
    .send(machineData)
    .expect(304)
    .end(function(err, res) {
      if (err) {
        return done(err);
      }
      done();
    });
  });

});


