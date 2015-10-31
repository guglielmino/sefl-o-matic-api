'use strict';

var passport = require('passport');
var config = require('../config/environment');
var jwt = require('jsonwebtoken');
var expressJwt = require('express-jwt');
var compose = require('composable-middleware');
var validateJwt = expressJwt({
    secret: config.secrets.session
});
var Q = require('q');

var self;


var AuthService = function (usersProvider) {
    this.usersProvider = usersProvider;
    self = this;
};

/**
 * Attaches the user object to the request if authenticated
 * Otherwise returns 401
 */
AuthService.prototype.isAuthenticated = function () {

    return compose()
        // Validate jwt
        .use(function (req, res, next) {
            // allow access_token to be passed through query parameter as well
            if (req.query && req.query.hasOwnProperty('access_token')) {
                req.headers.authorization = 'Bearer ' + req.query.access_token;
            }
            validateJwt(req, res, next);
        })
        // Attach user to request
        .use(function (req, res, next) {

            self.usersProvider.findById(req.user._id)
                .then(function (user) {

                    if (!user) {
                        res.send(401);
                    } else {
                        req.user = user;
                        next();
                    }
                }, function (providerError) {
                    // TODO: Mappare il provider error to error
                    next(providerError);
                });
        });
};

/**
 * Checks if the user role meets the minimum requirements of the route
 */
AuthService.prototype.hasRole = function (roleRequired) {
    console.log("DEBUG: Checking for role " + roleRequired);

    if (!roleRequired) {
        throw new Error('Required role needs to be set');
    }

    return compose()
        .use(self.isAuthenticated())
        .use(function meetsRequirements(req, res, next) {
            if (config.userRoles.indexOf(req.user.role) >= config.userRoles.indexOf(roleRequired)) {
                next();
            } else {
                res.send(403);
            }
        });
}

/**
 * Returns a jwt token signed by the app secret
 */
AuthService.prototype.signToken = function (id) {
    return jwt.sign({
        _id: id
    }, config.secrets.session, {
        expiresInMinutes: 60 * 5
    });
}

/**
 * Set token cookie directly for oAuth strategies
 */
AuthService.prototype.setTokenCookie = function (req, res) {
    if (!req.user) {
        return res.json(404, {
            message: 'Something went wrong, please try again.'
        });
    }
    var token = self.signToken(req.user._id, req.user.role);
    res.cookie('token', JSON.stringify(token));
    res.redirect('/');
}


module.exports = AuthService;