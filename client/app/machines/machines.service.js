'use strict';

angular.module('SelfOMaticApp')
  .factory('MachineService', function MachineService($location, $rootScope, $http, $cookieStore, $q) {
    

    return {

      /**
       * Get all machines from web service
       *
       * @return {Promise}
       */
      getMachines: function() {
        var deferred = $q.defer();

        $http.get('/api/machines', {}).
        success(function(data) {
          deferred.resolve(data);
        }).
        error(function(err) {
          deferred.reject(err);
        }.bind(this));

        return deferred.promise;
      }
    };
  });
