'use strict';

angular.module('SelfOMaticApp')
    .controller('ImageBrowserCtrl', [
        '$mdDialog',
        'MachineService',
        'serial',
        function($mdDialog, MachineService, serial) {
            var imgIndex = 0;
            var self = this;

            MachineService.getMachineUploads(serial)
                .then(function (results) {
                    self.images = results;
                    self.imageUrl = results[results.length - 1];
                    self.imageCount = results.length;
                });

            self.nextImg = function () {
                if (imgIndex < $scope.vm.images.length) {
                    imgIndex++;
                    self.imageUrl = $scope.vm.images[imgIndex];
                }
            };

            self.prevImg = function () {
                if (imgIndex > 0) {
                    imgIndex--;
                    self.imageUrl = $scope.vm.images[imgIndex];
                }
            };

            self.hide = function () {
                $mdDialog.hide();
            };
            self.cancel = function () {
                $mdDialog.cancel();
            };
            self.answer = function (answer) {
                $mdDialog.hide(answer);
            };
        }]);