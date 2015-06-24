 'use strict';

angular.module('SelfOMaticApp')
  .config(function ($stateProvider) {
  	 

    $stateProvider
      .state('machines', {
        url: '/machines',

        templateUrl: 'app/machines/machines.html',
        controller: 'MachinesCtrl'
      });
  });