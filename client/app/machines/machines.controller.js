(function () {
    'use strict';

    angular.module('somapp.machines')
        .controller('MachinesCtrl', [
            '$rootScope',
            '$filter',
            '$mdDialog',
            'MachineService',
            'SocketService',
            function ($rootScope, $filter, $mdDialog, MachineService, SocketService) {
                var self = this;
                var originatorEv;

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

                this.openMenu = function($mdOpenMenu, ev) {
                    originatorEv = ev;
                    $mdOpenMenu(ev);
                };

                this.deleteMachine = function (ev, serial) {

                    var confirm = $mdDialog
                        .confirm()
                        .title('Eliminare la macchina ' + serial + '?')
                        .content('Nota: tutte le configurazioni andranno perse.')
                        .targetEvent(ev)
                        .ok('Ok')
                        .cancel('Annulla');

                    $mdDialog.show(confirm)
                        .then(function () {
                            doDeleteMachine(serial);
                        }, function () {

                        });

                    originatorEv = null;
                };

                this.nextImg = function (serial) {
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

                this.prevImg = function (serial) {
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

                function doDeleteMachine(serial) {
                    MachineService
                        .deleteMachine(serial)
                        .then(function (res) {
                                _.remove(self.machines, function (item) {
                                    return item.serial === serial;
                                });
                            },
                            function (err) {

                            });
                }

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

            }]);
})();