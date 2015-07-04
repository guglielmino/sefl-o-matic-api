'use strict';

angular.module('SelfOMaticApp')
  .controller('LoginCtrl', function ($scope, $rootScope, Auth, $location, $window) {
    $scope.user = {};
    $scope.errors = {};

    $rootScope.areaTitle = "Self-O-Matic Login";

    $scope.login = function(userForm) {
      $scope.submitted = true;

      if(userForm.$valid) {

        Auth.login({
          email: $scope.user.username,
          password: $scope.user.password
        })
        .then( function() {
          // Logged in, redirect to home

          $location.path('/');
        })
        .catch( function(err) {

          $scope.errors.other = err.message;
        });
      }
    };

    $scope.loginOauth = function(provider) {
      $window.location.href = '/auth/' + provider;
    };
  });
