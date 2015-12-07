'use strict';

angular.module('SelfOMaticApp')
    .config(function ($stateProvider) {

        $stateProvider
            .state('machines', {
                url: '/machines',
                templateUrl: 'app/machines/machines.html',
                controller: 'MachinesCtrl'
            })

            .state('config', {
                url: '/machines/:serial/config',
                templateUrl: 'app/machines/config/config.html',
                controller: 'ConfigCtrl'
            });
    });