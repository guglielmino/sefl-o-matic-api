'use strict';

angular.module('somapp')
    .controller('ToolbarCtrl', function ($scope) {
        $scope.menuItems = [
            {name: 'Home', url: '/#home'},
            {name: 'Macchie', url: '/#machines'},
            {name: 'Settings', url: '/#settings'}
        ];
    });