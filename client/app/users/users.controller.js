'use strict';

angular.module('SelfOMaticApp')
    .controller('UsersCtrl', function ($scope, $rootScope, UserService) {

        UserService.getUsers()
            .then(function (data) {
                $scope.users = data;
            });

        $rootScope.areaTitle = 'Utenti registrati';
    });