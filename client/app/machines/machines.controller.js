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
                        _.each(self.machines, function (machine) {
                            MachineService.getMachineUploads(machine.serial)
                                .then(function (results) {
                                    machine.images = results;
                                    machine.imageUrl = _.last(results);
                                });
                        });
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

                function getMachine(serial){
                    return _.find(self.machines, function(m) {
                        return m.serial === serial;
                    });
                }

                self.nextImg = function (serial) {
                    var machine = getMachine(serial);

                    machine.imageIndex = ((machine.imageIndex === undefined) ? machine.images.length - 1 : machine.imageIndex);
                    if (machine.imageIndex  < machine.images.length - 1) {
                        machine.imageIndex ++;
                    }
                    else{
                        machine.imageIndex = 0;
                    }

                    machine.imageUrl = machine.images[machine.imageIndex ];
                };

                self.prevImg = function (serial) {
                    var machine = getMachine(serial);

                    machine.imageIndex = ((machine.imageIndex === undefined) ? machine.images.length - 1 : machine.imageIndex);
                    if (machine.imageIndex > 0) {
                        machine.imageIndex--;
                    }
                    else{
                        machine.imageIndex = machine.images.length - 1;
                    }

                    machine.imageUrl = machine.images[machine.imageIndex ];
                };
            }]);
})();