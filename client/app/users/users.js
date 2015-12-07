'use strict';

angular.module('SelfOMaticApp')

    .config(function ($stateProvider) {

        $stateProvider
            .state('users', {
                url: '/users',
                templateUrl: 'app/users/users.html',
                controller: 'UsersCtrl'
            });

    });