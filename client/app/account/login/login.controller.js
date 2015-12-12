'use strict';

angular.module('SelfOMaticApp')
    .controller('LoginCtrl', ['$rootScope', 'Auth', '$location', '$window',
        function ($rootScope, Auth, $location, $window) {
            var self = this;
            self.user = {};
            self.errors = {};

            $rootScope.areaTitle = 'Self-O-Matic Login';

            self.login = function (userForm) {
                self.submitted = true;

                if (userForm.$valid) {

                    Auth.login({
                            email: self.user.username,
                            password: self.user.password
                        })
                        .then(function () {
                            // Logged in, redirect to home or target url
                            var targetUrl = $location.search().targetUrl || '/';
                            $location.path(targetUrl);
                        })
                        .catch(function (err) {

                            self.errors.other = err.message;
                        });
                }
            };

            self.loginOauth = function (provider) {
                $window.location.href = '/auth/' + provider;
            };
        }]);
