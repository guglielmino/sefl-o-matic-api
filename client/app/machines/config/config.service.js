'use strict';

angular.module('SelfOMaticApp')
  .factory('ConfigService', function MachineService($location, $rootScope, $http, $cookieStore, $q) {
    

    return {

      /**
       * Get all machines from web service
       *
       * @return {Promise}
       */
      getMachineConfig: function(serial) {
        var deferred = $q.defer();

        $http
          .get('/api/machines/' + serial + '/config' )
          .success(function(data) {
            deferred.resolve(data);
          })
          .error(function(err) {
            deferred.reject(err);
          }
          .bind(this));

        return deferred.promise;
      },

      postMachineConfig: function(serial, configData) {
        var deferred = $q.defer();

        $http
          .post('/api/machines/' + serial + '/config', JSON.stringify(configData))
          .success(function(data) {   
            deferred.resolve(data);
          })
          .error(function(err) {
            deferred.reject(err);
          }
          .bind(this));

        return deferred.promise;
      }

    };
  });
