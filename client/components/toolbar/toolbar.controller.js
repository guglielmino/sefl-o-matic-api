
'use strict';

angular.module('SelfOMaticApp')
	.controller('ToolbarCtrl',  function($scope) {
		debugger;

		$scope.menuItems = [
			{ name: 'Home', url: '/#home'},
			{ name: 'Macchie', url: '/#machines'},
			{ name: 'Settings', url: '/#settings'}
		];
	});