'use strict';

var crypto = require('crypto');

var self;

var AuthHelper = function() {
    self = this;
};


/**
* Authenticate - check if the passwords are the same
*
* @param {String} plainText
* @return {Boolean}
* @api public
*/
AuthHelper.prototype.authenticate = function(user, plainText) {
	return self.encryptPassword(user.salt, plainText) === user.hashedPassword;
};

/**
* Make salt
*
* @return {String}
* @api public
*/
AuthHelper.prototype.makeSalt = function() {
	return crypto.randomBytes(16).toString('base64');
};

/**
* Encrypt password
*
* @param {String} password
* @return {String}
* @api public
*/
AuthHelper.prototype.encryptPassword = function(salt, password) {
	if (!password || !salt) return '';
	var msalt = new Buffer(salt, 'base64');
	return crypto.pbkdf2Sync(password, msalt, 10000, 64).toString('base64');
};


module.exports = AuthHelper;

