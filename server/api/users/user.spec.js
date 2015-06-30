'use strict';

var should = require('should');
var app = require('../../app');
var request = require('supertest');
var chalk = require('chalk');

describe('Users controller', function() {


	it('should create new user', function(done) {

	 	var userData = {
	    	name: "Ciccio",
  			email: "ciccio@nowhere.org",
  			password: "testpwd"
	    };

	    request(app)
		    .post('/api/users')
		    .send(userData)
		    .expect(201)
		    .end(function(err, res) {
		      if (err) {
		        return done(err);
		      }
		      done();
		    });
	});


});