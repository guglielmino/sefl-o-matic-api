'use strict';

angular.module('SelfOMaticApp')
	.controller('HomeCtrl', ['$rootScope',
		function ($rootScope) {
		$rootScope.areaTitle = 'Self-O-Matic';

		$rootScope.auth = true;
	}]);