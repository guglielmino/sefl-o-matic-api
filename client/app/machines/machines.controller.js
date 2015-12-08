'use strict';

angular.module('SelfOMaticApp')
    .controller('MachinesCtrl', [
        '$scope',
        '$rootScope',
        '$filter',
        '$mdDialog',
        '$mdBottomSheet',
        'MachineService',
        'SocketService',
        function ($scope, $rootScope, $filter, $mdDialog, $mdBottomSheet, MachineService, SocketService) {

            MachineService.getMachines()
                .then(function (data) {
                    $scope.machines = data;
                });

            SocketService.on('registered', function (socket, roomSerial) {
                onMachineEvent(true, roomSerial);
            });

            SocketService.on('unregistered', function (socket, roomSerial) {
                onMachineEvent(false, roomSerial);
            });

            $rootScope.areaTitle = 'Macchine registrate';

            $scope.showActionsSheet = function ($event, serial) {
                $mdBottomSheet.show({
                    templateUrl: 'app/machines/actions/machine-actions.html',
                    controller: 'MachineActionsCtrl',
                    locals: {serial: serial},
                    scope: $scope,
                    preserveScope: true,
                    targetEvent: $event
                }).then(function (clickedItem) {

                });
            };

            function onMachineEvent(connected, roomSerial) {
                var serial = roomSerial.split(':')[1];
                for (var idx in $scope.machines) {
                    if ($scope.machines[idx].serial === serial) {
                        $scope.machines[idx].isOn = connected;
                    }
                }
            }
        }]);