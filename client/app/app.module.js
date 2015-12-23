/**
 * Created by fabrizio on 23/12/15.
 */
(function () {
    'use strict';

    /**
     * @ngdoc overview
     * @name somapp
     * @description
     * The main app module
     */
    angular.module('somapp', [
        'ui.router',
        'ngCookies',
        'ngResource',
        'ngSanitize',
        'ngMaterial',
        'ngMdIcons',
        'ngMessages',
        'ui.gravatar',
        'btford.socket-io',
        'somapp.account.login',
        'somapp.home',
        'somapp.machines',
        'somapp.machines.actions',
        'somapp.machines.config',
        'somapp.users'
    ]);
})();