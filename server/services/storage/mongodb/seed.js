/**
 * Load test data in DB
 */


'use strict';

var Machine = require('./models/machine');


Machine.create({
	name: 'test',
	serial: '333',
	config:{
		fbid: "333333",
    	fbalbum_id: "sssss"
    }
});