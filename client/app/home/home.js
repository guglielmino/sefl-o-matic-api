 'use strict';

angular.module('somapp.home')
  .config(function ($stateProvider) {
  	 

    $stateProvider
      .state('home', {
        url: '/home',

        templateUrl: 'app/home/home.html',
        controller: 'HomeCtrl'
      });
  });