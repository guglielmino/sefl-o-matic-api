/**
 * Created by fabrizio on 23/11/15.
 */
'use strict';

angular.module('SelfOMaticApp')
    .controller('MachineActionsCtrl', [
        '$mdDialog',
        '$mdBottomSheet',
        'MachineService',
        'serial',
        'machines',
        function ($mdDialog, $mdBottomSheet, MachineService, serial, machines) {
            var self = this;

            self.deleteMachine = function (ev) {

                var confirm = $mdDialog
                    .confirm()
                    .title('Eliminare la Self-O-Matic ' + serial + '?')
                    .content('Nota: tutte le configurazioni andranno perse.')
                    .targetEvent(ev)
                    .ok('Ok')
                    .cancel('Annulla');

                $mdDialog.show(confirm)
                    .then(function () {
                        doDeleteMachine(serial);
                        $mdBottomSheet.hide();
                    }, function () {
                        $mdBottomSheet.hide();
                    });
            };

            self.showUploads = function (ev) {
                $mdDialog.show({
                        controller: 'ImageBrowserCtrl',
                        controllerAs: 'wm',
                        templateUrl: 'app/machines/actions/image-browser.html',
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

            function doDeleteMachine(serial) {
                MachineService
                    .deleteMachine(serial)
                    .then(function (res) {
                            _.remove(machines, function (item) {
                                return item.serial === serial;
                            });
                        },
                        function (err) {

                        });
            }
        }]);