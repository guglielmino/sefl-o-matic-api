var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

var AuthHelper = require('../../services/helpers/auth.helper');
var authHelper = new AuthHelper();

exports.setup = function (usersProvider, config) {

    passport.use(new LocalStrategy({
            usernameField: 'email',
            passwordField: 'password' // this is the virtual field on the model
        },
        function (email, password, done) {

            usersProvider.findOne({email: email.toLowerCase()})
                .then(function (user) {

                        if (!user) {
                            return done(null, false, {message: 'This email is not registered.'});
                        }

                        if (!authHelper.authenticate(user, password)) {
                            return done(null, false, {message: 'This password is not correct.'});
                        }

                        return done(null, user);
                    },
                    function (providerError) {
                        done(providerError);
                    });
        }
    ));
};