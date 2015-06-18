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

  it('get 404 if machines config does not exists', function(done) {
    request(app)
    .get('/api/machines/123/config')
    .expect(404)
    .end(function(err, res) {
      if (err) {
        return done(err);
      }
      done();
    });
  });


  it('get machines config', function(done) {
    request(app)
    .get('/api/machines/333/config')
    .expect(200)
    .end(function(err, res) {
      if (err) {
        return done(err);
      }
      done();
    });
  });

  it('set config for a machine identified by serial 333', function(done) {
    var configData = {
      fbid: "1111111111",
      fbalbumid: "3333333333333"
    };

    request(app)
    .post('/api/machines/333/config')
    .send(configData)
    .expect(200)
    .end(function(err, res) {
      if(err){
        return done(err);
      }
      done();
    });
  });

});


