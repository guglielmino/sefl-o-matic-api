(function () {
    'use strict';

angular.module('somapp.machines')
    .factory('MachineService', function MachineService($location, $rootScope, $http, $cookieStore, $q) {

        var machineService = {};

        /**
         * Get all machines from web service
         *
         * @return {Promise}
         */
        machineService.getMachines = function () {
            var deferred = $q.defer();

            $http.get('/api/machines', {}).
                success(function (data) {
                    deferred.resolve(data);
                }).
                error(function (err) {
                    deferred.reject(err);
                });

            return deferred.promise;
        };

        /**
         * Delete a machine
         *
         * @return {Promise}
         */
        machineService.deleteMachine = function (serial) {
            var deferred = $q.defer();

            $http.delete('/api/machines/' + serial)
                .success(function () {
                    deferred.resolve();
                }).error(function (data, status) {
                    deferred.reject(data);
                });

            return deferred.promise;
        };

        /**
         * Get all images uploaded for a machine
         *
         * @return {Promise}
         */
        machineService.getMachineUploads = function (serial) {
            var deferred = $q.defer();

            $http.get('/api/machines/' + serial + '/upload', {}).
                success(function (data) {
                    deferred.resolve(data);
                }).
                error(function (err) {
                    deferred.reject(err);
                });

            return deferred.promise;
        };

        return machineService;

    });
})();
