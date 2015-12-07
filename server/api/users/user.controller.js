'use strict';

var errorMapper = require('../../services/helpers/controller.error');
var config = require('../../config/environment');
var jwt = require('jsonwebtoken');

var self;

var UserController = function(usersProvider)  {
	this.usersProvider = usersProvider;
	self = this;
};

/**
 * Get all registered users
 *
 * @param req
 * @param res
 */
UserController.prototype.index = function(req, res) {

	self.usersProvider.find({})
		.then(function(result) {
			if(result){
				res.json(200, result);
			}
			else{
				res.status(404).send();
			}

		}, function(providerError) {
			res
				.status(errorMapper.errorCodeToStatus(providerError.status))
				.send(providerError.message);
		});
};

/**
 * Creates a new user
 */
UserController.prototype.create = function (req, res, next) {
  self.usersProvider.create(req.body)
  	.then(function(user) {
	  		var token = jwt.sign({_id: user._id }, config.secrets.session, { expiresInMinutes: 60*5 });
 			  res.json(201, { token: token });
	  	}, function(providerError) {
	  		console.log("err " + providerError.message);
        res
          .status(errorMapper.errorCodeToStatus(providerError.status))
          .send(providerError.message);
	  	});	
};

/**
 * Get a single user
 */
UserController.prototype.show = function (req, res, next) {
  var userId = req.params.id;

  self.usersProvider.findById(userId)
  	.then(function(user){
  		if (!user) { 
  			res.send(401);
  		}
  		else{
    		res.json(user.profile);
    	}
  	}, function(providerError){
  		console.log("err " + providerError.message);
      res
        .status(errorMapper.errorCodeToStatus(providerError.status))
        .send(providerError.message);
  	});
};

UserController.prototype.destroy = function(req, res) {
  console.log("DESTROY ");
	var userId = req.params.id;
	self.usersProvider.delById(userId)
	  	.then(function(user){
	  		res.send(204);
	  	}, function(providerError){
	  		console.log("err " + providerError.message);
        res
          .status(errorMapper.errorCodeToStatus(providerError.status))
          .send(providerError.message);
	  	});
};


// TODO: Da implementare capendo se il metodo authenticate è corretto 
// che sia in User (risp : NO)
UserController.prototype.changePassword = function(req, res, next) {
  var userId = req.user._id;
  var oldPass = String(req.body.oldPassword);
  var newPass = String(req.body.newPassword);

  self.usersProvider.findById(userId)
  	.then(function(user){
  		if (!user) { 
  			res.send(401);
  		}
  		else{
    		res.json(user.profile);
    	}
  	}, function(providerError){
      res
        .status(errorMapper.errorCodeToStatus(providerError.status))
        .send(providerError.message);
  	});
};


UserController.prototype.me = function(req, res, next) {
	var userId = req.user._id;

	self.usersProvider.findById(userId)
	  	.then(function(user){
	  		if(!user){
	  			res.json(401);
	  		}
	  		else{
	  			res.json(user);
	  		}
	  	}, function(providerError){
	  		console.log("err " + providerError.message);
        res
          .status(errorMapper.errorCodeToStatus(providerError.status))
          .send(providerError.message);
  	  });
};

UserController.prototype.authCallback = function(req, res, next) {
  res.redirect('/');
};




module.exports = UserController;