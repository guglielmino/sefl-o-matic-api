'use strict';

angular.module('SelfOMaticApp')
    .controller('UsersCtrl', function ($rootScope, UserService) {
        var self = this;
        UserService.getUsers()
            .then(function (data) {
                self.users = data;
            });

        $rootScope.areaTitle = 'Utenti registrati';
    });