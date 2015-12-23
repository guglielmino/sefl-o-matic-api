(function () {
    'use strict';

    angular.module('somapp.machines')
        .controller('MachinesCtrl', [
            '$rootScope',
            '$filter',
            '$mdDialog',
            '$mdBottomSheet',
            'MachineService',
            'SocketService',
            function ($rootScope, $filter, $mdDialog, $mdBottomSheet, MachineService, SocketService) {
                var self = this;
                MachineService.getMachines()
                    .then(function (data) {
                        self.machines = data;
                    });

                SocketService.on('registered', function (socket, roomSerial) {
                    onMachineEvent(true, roomSerial);
                });

                SocketService.on('unregistered', function (socket, roomSerial) {
                    onMachineEvent(false, roomSerial);
                });

                $rootScope.areaTitle = 'Macchine registrate';

                self.showActionsSheet = function ($event, serial) {
                    $mdBottomSheet.show({
                        templateUrl: 'app/machines/actions/machine-actions.html',
                        controller: 'MachineActionsCtrl',
                        controllerAs: 'vm',
                        locals: {serial: serial, machines: self.machines},
                        preserveScope: true,
                        targetEvent: $event
                    }).then(function (clickedItem) {

                    });
                };

                function onMachineEvent(connected, roomSerial) {
                    var serial = roomSerial.split(':')[1];
                    for (var idx in self.machines) {
                        if (self.machines[idx].serial === serial) {
                            self.machines[idx].isOn = connected;
                        }
                    }
                }
            }]);
})();