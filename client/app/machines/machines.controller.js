'use strict';

angular.module('SelfOMaticApp')
	.controller('MachinesCtrl', function($scope, $rootScope, $filter, MachineService, SocketService) {

		MachineService.getMachines()
			.then(function(data) {
				$scope.machines = data;
			});

		SocketService.on('registered', function(socket, roomSerial) {
			onMachineEvent(true, roomSerial);
		});


		SocketService.on('unregistered', function(socket, roomSerial) {
			onMachineEvent(false, roomSerial);
		});


		$rootScope.areaTitle = "Macchine registrate";

		function onMachineEvent(connected, roomSerial) {
			console.log((connected ? 'registered' : 'unregistered ') + roomSerial);

			var serial = roomSerial.split(':')[1];
			for (var idx in $scope.machines) {
				if ($scope.machines[idx].serial === serial) {
					$scope.machines[idx].isOn = connected;
				}
			}
		}
	});