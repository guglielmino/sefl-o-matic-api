(function () {
    'use strict';

angular.module('somapp.users')

    .config(function ($stateProvider) {

        $stateProvider
            .state('users', {
                url: '/users',
                templateUrl: 'app/users/users.html',
                controller: 'UsersCtrl',
                controllerAs: 'vm'
            });

    });
})();