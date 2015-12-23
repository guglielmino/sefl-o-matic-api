(function () {
    'use strict';

    angular.module('somapp.account.login')
        .config(function ($stateProvider) {
            $stateProvider
                .state('login', {
                    url: '/login',
                    templateUrl: 'app/account/login/login.html',
                    controller: 'LoginCtrl',
                    controllerAs: 'vm'
                });
        });
})();