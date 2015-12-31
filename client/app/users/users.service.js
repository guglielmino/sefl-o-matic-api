(function () {
    'use strict';

angular.module('somapp.users')
    .factory('UserService', function MachineService($http, $cookieStore, $q) {
        return {
            getUsers: function () {
                var deferred = $q.defer();

                $http.get('/api/users')
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
})();