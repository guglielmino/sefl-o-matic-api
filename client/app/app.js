'use strict';

angular.module('SelfOMaticApp', [
	'ui.router',
	'ngCookies',
  	'ngResource',
  	'ngSanitize',
  	'ngMaterial',
  	'ngMdIcons'
])
.config(function  ($urlRouterProvider, $locationProvider, $mdThemingProvider){
	$urlRouterProvider
	  .otherwise('/home'); // Nota: usando / e attivando html5Mode si entra in recursione

	   $mdThemingProvider.theme('default')
                          .primaryPalette('blue')
                          .accentPalette('red');

	$locationProvider.html5Mode(true);
});

