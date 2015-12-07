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

        $scope.showActionsSheet = function($event, serial) {
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

        $scope.showUploads = function (ev, serial) {
            $mdDialog.show({
                controller: DialogController,
                templateUrl: 'app/machines/imagebrowser.html',
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
            var imgIndex = 0;

            MachineService.getMachineUploads(serial)
                .then(function (results) {
                    $scope.vm.images = results;
                    $scope.vm.imageUrl = results[results.length - 1];
                });

            $scope.nextImg = function () {
                if (imgIndex < $scope.vm.images.length) {
                    imgIndex++;
                    $scope.vm.imageUrl = $scope.vm.images[imgIndex];
                }
            };

            $scope.prevImg = function () {
                if (imgIndex > 0) {
                    imgIndex--;
                    $scope.vm.imageUrl = $scope.vm.images[imgIndex];
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