'use strict';

var should = require('should');
var app = require('../../app');
var request = require('supertest');

var mongoose = require('mongoose');

describe('POST /api/machines/', function() {

  before(function() {
    console.log("BEFORE TEST SUITE");
    mongoose.connection.db.dropDatabase();
  });

  it('should respond 201 created', function(done) {
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

  it('should respond 201 created', function(done) {
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



});


