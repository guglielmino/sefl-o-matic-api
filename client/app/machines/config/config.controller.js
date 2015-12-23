'use strict';

angular.module('somapp.machines.config')
    .controller('ConfigCtrl', ['$rootScope', '$stateParams', '$state', '$mdDialog', 'ConfigService',
        function ($rootScope, $stateParams, $state, $mdDialog, ConfigService) {

            var self = this;
            var serialNumber = $stateParams.serial;

            ConfigService.getMachineConfig(serialNumber)
                .then(function (data) {
                    self.machineConfig = data;
                });

            self.saveConfig = function () {
                ConfigService.postMachineConfig(serialNumber, self.machineConfig)
                    .then(function (data) {
                        var alert = $mdDialog.alert({
                            title: 'Config for ' + serialNumber,
                            content: 'Configuration saved',
                            ok: 'Close'
                        });
                        $mdDialog
                            .show(alert)
                            .finally(function () {
                                alert = undefined;
                                $state.go('machines');
                            });
                    });
            };

            $rootScope.areaTitle = 'Configurazione di ' + serialNumber;
        }]);