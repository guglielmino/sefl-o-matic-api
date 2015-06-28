'use strict';

angular.module('SelfOMaticApp')
	.controller('HomeCtrl', function ($scope, $rootScope) {
		$rootScope.areaTitle = "Self-O-Matic";

		$rootScope.auth = true;
	});