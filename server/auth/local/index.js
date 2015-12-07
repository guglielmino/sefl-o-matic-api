'use strict';

var express = require('express');
var passport = require('passport');

module.exports = function (usersProvider) {
    var router = express.Router();

    var AuthService = require('../auth.service');
    var auth = new AuthService(usersProvider);

    router.post('/', function (req, res, next) {

        passport.authenticate('local', function (err, user, info) {

            var error = err || info;
            if (error) {
                return res.json(401, error);
            }
            if (!user) {
                return res.json(404, {message: 'Something went wrong, please try again.'});
            }

            var token = auth.signToken(user._id, user.role);
            res.json({token: token});
        })(req, res, next)


    });

    return router;
}