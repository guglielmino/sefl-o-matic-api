'use strict';

angular.module('SelfOMaticApp')
    .controller('MachinesCtrl', ['$scope', '$rootScope', '$filter', '$mdDialog', 'MachineService', 'SocketService',
        function ($scope, $rootScope, $filter, $mdDialog, MachineService, SocketService) {

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


        $rootScope.areaTitle = "Macchine registrate";

        $scope.showUploads = function (ev, serial) {
            $mdDialog.show({
                controller: DialogController,
                templateUrl: 'app/machines/imagebrowser.tpl.html',
                parent: angular.element(document.body),
                targetEvent: ev,
                locals: {serial: serial},
                bindToController: true,
                clickOutsideToClose: true
            })
                .then(function (answer) {
                    // Pressed answer
                }, function () {
                    // Cancelled dialog
                });
        };

        $scope.deleteMachine = function (ev, serial) {

            var confirm = $mdDialog
                .confirm()
                .title('Eliminare la Self-O-Matic ' + serial + '?')
                .content('Nota: tutte le configurazioni andranno perse.')
                .targetEvent(ev)
                .ok('Ok')
                .cancel('Annulla');

            $mdDialog.show(confirm)
                .then(function () {
                    // OK
                    console.log("Ok");
                    doDeleteMachine(serial);
                }, function () {
                    // ANNULLA
                    console.log("Annulla");
                });
        };

        function doDeleteMachine(serial) {
            MachineService
                .deleteMachine(serial)
                .then(function (res) {
                    console.log("deleted " + res);
                    _.remove($scope.machines, function (item) {
                        return item.serial === serial;
                    });
                },
                function (err) {
                    console.log("err " + err);
                });
        }

        function onMachineEvent(connected, roomSerial) {
            console.log((connected ? 'registered' : 'unregistered ') + roomSerial);

            var serial = roomSerial.split(':')[1];
            for (var idx in $scope.machines) {
                if ($scope.machines[idx].serial === serial) {
                    $scope.machines[idx].isOn = connected;
                }
            }
        }

        function DialogController($scope, $mdDialog, MachineService, serial) {
            $scope.vm = {};
            var img_index = 0;

            MachineService.getMachineUploads(serial)
                .then(function (results) {
                    $scope.vm.images = results;
                    $scope.vm.image_url = results[results.length - 1];
                });

            $scope.nextImg = function () {
                if (img_index < $scope.vm.images.length) {
                    img_index++;
                    $scope.vm.image_url = $scope.vm.images[img_index];
                }
            };

            $scope.prevImg = function () {
                if (img_index > 0) {
                    img_index--;
                    $scope.vm.image_url = $scope.vm.images[img_index];
                }
            };

            $scope.hide = function () {
                $mdDialog.hide();
            };
            $scope.cancel = function () {
                $mdDialog.cancel();
            };
            $scope.answer = function (answer) {
                $mdDialog.hide(answer);
            };
        }
    }]);