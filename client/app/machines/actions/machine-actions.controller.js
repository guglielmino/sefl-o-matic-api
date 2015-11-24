/**
 * Created by fabrizio on 23/11/15.
 */
'use strict';

angular.module('SelfOMaticApp')
    .controller('MachineActionsCtrl', [
        '$scope',
        '$mdDialog',
        '$mdBottomSheet',
        'MachineService',
        'serial',
        function ($scope, $mdDialog, $mdBottomSheet, MachineService, serial) {
            $scope.deleteMachine = function (ev) {

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

            function doDeleteMachine(serial) {
                MachineService
                    .deleteMachine(serial)
                    .then(function (res) {
                        // TODO: Come alterare l'elenco nel parent?
                        _.remove($scope.machines, function (item) {
                            return item.serial === serial;
                        });
                    },
                    function (err) {
                        console.log("err " + err);
                    });
            }
        }])