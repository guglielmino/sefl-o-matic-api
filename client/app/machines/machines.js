 'use strict';

angular.module('SelfOMaticApp')
  .config(function ($stateProvider) {
  	 
    $stateProvider
      .state('machines', {
        url: '/machines',
        templateUrl: 'app/machines/machines.html',
        controller: 'MachinesCtrl'
      })
  	  .state('machineConfig', {
        url: "/machines/:serial/config",
        templateUrl: 'app/machines/config/config.html',
        controller: 'ConfigCtrl'
	  });

  });