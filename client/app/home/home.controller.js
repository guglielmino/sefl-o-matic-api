'use strict';

angular.module('SelfOMaticApp')
	.controller('HomeCtrl', ['$scope', '$rootScope',
		function ($scope, $rootScope) {
		$rootScope.areaTitle = 'Self-O-Matic';

		$rootScope.auth = true;
	}]);