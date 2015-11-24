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


        $rootScope.areaTitle = "Macchine registrate";

        $scope.showActionsSheet = function($event, serial) {
            $scope.alert = '';
            $mdBottomSheet.show({
                templateUrl: 'app/machines/actions/machine-actions.html',
                controller: 'MachineActionsCtrl',
                locals: {serial: serial},
                targetEvent: $event
            }).then(function (clickedItem) {
                $scope.alert = clickedItem['name'] + ' clicked!';
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