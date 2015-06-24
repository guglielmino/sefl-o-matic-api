'use strict';

angular.module('SelfOMaticApp')
	.controller('MachinesCtrl', function ($scope) {
		
		var machines = [
			{ name : 'Selfi One', serial : '1233'}, 
			{ name : 'Selfi Two', serial : '444'}
		];

		$scope.getMachines = function() {
			return machines;
		};
	});