'use strict';

var should = require('should');
var app = require('../../app');
var request = require('supertest');

describe('POST /api/machines/', function() {

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


