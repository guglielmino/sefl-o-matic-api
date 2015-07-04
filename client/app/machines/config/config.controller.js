'use strict';

angular.module('SelfOMaticApp')
	.controller('ConfigCtrl', function ($scope, $rootScope, $stateParams, $state, ConfigService) {
		var serial = $stateParams.serial;

		ConfigService.getMachineConfig(serial)
			.then(function(data){
				$scope.machineConfig = data;
			});

		$scope.saveConfig = function(){
			ConfigService.postMachineConfig(serial, $scope.machineConfig)
				.then(function(data){
					debugger;
					$state.go('machineConfig', { serial : serial })
				}); 
		};

		$rootScope.areaTitle = "Configurazione di " + serial;
	});