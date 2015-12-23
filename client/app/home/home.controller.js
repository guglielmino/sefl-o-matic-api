(function () {
    'use strict';

    angular.module('somapp.home')
        .controller('HomeCtrl', ['$rootScope',
            function ($rootScope) {
                $rootScope.areaTitle = 'Self-O-Matic';

                $rootScope.auth = true;
            }]);
})();