'use strict';

var should = require('should');
var app = require('../../app');
var request = require('supertest');
var chalk = require('chalk');
var async = require('async');


function getRandomSerial(){
  var s = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  return Array(5)
                          .join()
                          .split(',')
                          .map(function() { 
                            return s.charAt(Math.floor(Math.random() * s.length)); 
                          }).join('');

}

describe('Machines controller', function() {

  it('should create machine if not exists', function(done) {
    var randomSerial = getRandomSerial();

    var machineData = {
      serial: randomSerial,
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

  it('should returns 400 if serial is empty', function(done) {
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

  it('should return 304 if machines serial is already stored', function(done) {
    var randomSerial = getRandomSerial();
    var machineData = {
      serial: randomSerial,
      name: "Machine host name"
    };

    var agent = request(app);

    async.series([
          function(cb) { agent.post('/api/machines/').send(machineData).expect(201, cb); },
          function(cb) { agent.post('/api/machines/').send(machineData).expect(304, cb); },
       ], done);
 });

  it('should get 404 if machines config does not exists', function(done) {
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


  it('should get machine config', function(done) {
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


