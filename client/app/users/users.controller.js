'use strict';

angular.module('SelfOMaticApp')
    .controller('UsersCtrl', function ($rootScope, UserService) {

        UserService.getUsers()
            .then(function (data) {
                this.users = data;
            });

        $rootScope.areaTitle = 'Utenti registrati';
    });