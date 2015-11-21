'use strict';

angular.module('SelfOMaticApp')
	.controller('ConfigCtrl', ['$scope', '$rootScope', '$stateParams', '$state', '$mdDialog', 'ConfigService',
		function($scope, $rootScope, $stateParams, $state, $mdDialog, ConfigService) {

		var serialNumber = $stateParams.serial;

		ConfigService.getMachineConfig(serialNumber)
			.then(function(data) {
				$scope.machineConfig = data;
			});

		$scope.saveConfig = function() {
			ConfigService.postMachineConfig(serialNumber, $scope.machineConfig)
				.then(function(data) {
					var alert = $mdDialog.alert({
						title: 'Config for ' + serialNumber,
						content: 'Configuration saved',
						ok: 'Close'
					});
					$mdDialog
						.show(alert)
						.finally(function() {
							alert = undefined;
							$state.go('machines');
						});
				});
		};



		$rootScope.areaTitle = "Configurazione di " + serialNumber;
	}]);