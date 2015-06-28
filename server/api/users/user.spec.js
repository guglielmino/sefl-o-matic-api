'use strict';

var should = require('should');
var app = require('../../app');
var request = require('supertest');

describe('User controller', function(){


	it('should create new user', function(done) {

	 	var userData = {
	    	name: "Ciccio",
  			email: "ciccio@nowhere.org"
	    };

	    request(app)
		    .post('/api/users/')
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