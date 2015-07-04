'use strict';

angular.module('SelfOMaticApp')
	.controller('MachinesCtrl', function ($scope, $rootScope, MachineService) {
	
		MachineService.getMachines()
			.then(function(data){
				$scope.machines = data;
			});

		$rootScope.areaTitle = "Macchine attive";
	});