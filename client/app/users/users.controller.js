(function () {
    'use strict';

angular.module('somapp.users')
    .controller('UsersCtrl', function ($rootScope, UserService) {
        var self = this;
        UserService.getUsers()
            .then(function (data) {
                self.users = data;
            });

        $rootScope.areaTitle = 'Utenti registrati';
    });
})();