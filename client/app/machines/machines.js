(function () {
    'use strict';

angular.module('somapp.machines')
    .config(function ($stateProvider) {

        $stateProvider
            .state('machines', {
                url: '/machines',
                templateUrl: 'app/machines/machines.html',
                controller: 'MachinesCtrl',
                controllerAs: 'vm'
            })

            .state('config', {
                url: '/machines/:serial/config',
                templateUrl: 'app/machines/config/config.html',
                controller: 'ConfigCtrl',
                controllerAs: 'vm'
            });
    });
})();