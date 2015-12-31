(function () {
    'use strict';

    angular.module('somapp')
        .config(function ($urlRouterProvider, $locationProvider, $mdThemingProvider, $httpProvider) {
            $urlRouterProvider
                .otherwise('/home'); // Nota: usando / e attivando html5Mode si entra in recursione

            $mdThemingProvider.theme('default')
                .primaryPalette('blue')
                .accentPalette('red');

            $locationProvider.html5Mode(true);
            $httpProvider.interceptors.push('authInterceptor');
        })
        .factory('authInterceptor', function ($rootScope, $q, $cookieStore, $location) {

            return {
                // Add authorization token to headers
                request: function (config) {
                    config.headers = config.headers || {};
                    if ($cookieStore.get('token')) {
                        config.headers.Authorization = 'Bearer ' + $cookieStore.get('token');
                    }
                    return config;
                },

                // Intercept 401s and redirect you to login
                responseError: function (response) {
                    if (response.status === 401) {
                        var targetUrl = $location.path();

                        $location.path('/login')
                            .search('target_url', targetUrl);

                        // remove any stale tokens
                        $cookieStore.remove('token');
                        return $q.reject(response);
                    } else {
                        return $q.reject(response);
                    }
                }
            };

        })
        .run(function ($rootScope, $location, $mdSidenav, Auth) {
            // Redirect to login if route requires auth and you're not logged in
            $rootScope.$on('$stateChangeStart', function (event, next) {
                Auth.isLoggedInAsync(function (loggedIn) {
                    if (next.authenticate && !loggedIn) {
                        $location.path('/login');
                    }
                });
            });

            $rootScope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
                // TODO: Andrebbe ricevuto in qualche modo il parametro identificativo della sidenav ('left')
                $mdSidenav('left').close();
            });
        })
        .controller('AppCtrl', ['$rootScope', '$mdSidenav', '$mdDialog', 'Auth', function ($rootScope, $mdSidenav, $mdDialog, Auth) {
            var self = this;

            this.toggleSidenav = function (menuId) {
                $mdSidenav(menuId).toggle();
            };

            Auth.isLoggedInAsync(function (res) {
                if (res) {
                    self.loggedUser = Auth.getCurrentUser();
                }
            });

            $rootScope.$on('loggedIn', function(){
                self.loggedUser = Auth.getCurrentUser();
            });


        }]);
})();