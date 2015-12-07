angular.module('SelfOMaticApp')
    .controller('ImageBrowserCtrl', [
        '$scope',
        '$mdDialog',
        'MachineService',
        'serial',
        function($scope, $mdDialog, MachineService, serial) {
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
        }]);