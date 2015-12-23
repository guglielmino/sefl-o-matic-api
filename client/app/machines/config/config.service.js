'use strict';

angular.module('somapp.machines.config')
    .factory('ConfigService', function ConfigService($location, $rootScope, $http, $cookieStore, $q) {

        return {

            /**
             * Get all machines from web service
             *
             * @return {Promise}
             */
            getMachineConfig: function (serialNumber) {
                var deferred = $q.defer();

                $http
                    .get('/api/machines/' + serialNumber + '/config')
                    .success(function (data) {
                        deferred.resolve(data);
                    })
                    .error(function (err) {
                        deferred.reject(err);
                    }
                        .bind(this));

                return deferred.promise;
            },

            postMachineConfig: function (serialNumber, configData) {
                var deferred = $q.defer();

                $http
                    .post('/api/machines/' + serialNumber + '/config', JSON.stringify(configData))
                    .success(function (data) {
                        deferred.resolve(data);
                    })
                    .error(function (err) {
                        deferred.reject(err);
                    }
                        .bind(this));

                return deferred.promise;
            }

        };
    });