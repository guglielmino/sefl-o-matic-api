'use strict';

angular.module('SelfOMaticApp')
    .factory('UserService', function MachineService($http, $cookieStore, $q) {
        return {
            getUsers: function() {
                var deferred = $q.defer();
                console.log("deferred " + deferred);

                $http.get('/api/users', {})
	                .success(function(data) {
	                    deferred.resolve(data);
	                })
	                .error(function(err) {
	                    console.log("err " + err);
	                    deferred.reject(err);
	                }
	                .bind(this));

                return deferred.promise;
            }
        };

    });