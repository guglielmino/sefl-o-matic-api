'use strict';

angular.module('SelfOMaticApp', [
	'ui.router',
	'ngCookies',
  	'ngResource',
  	'ngSanitize',
  	'ngMaterial'
])
.config(function  ($stateProvider, $urlRouterProvider, $locationProvider, $httpProvider){
	$urlRouterProvider
	  .otherwise('/home'); // Nota: usando / e attivando html5Mode si entra in recursione

	$locationProvider.html5Mode(true);
});

