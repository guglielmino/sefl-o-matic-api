angular.module('SelfOMaticApp')
	.factory('Auth', function Auth($location, $rootScope, $http, $cookieStore, $q) {
    var currentUser = {};
    if($cookieStore.get('token')) {
    //  currentUser = User.get();
    }

    return {

      /**
       * Authenticate user and save token
       *
       * @param  {Object}   user     - login info
       * @return {Promise}
       */
      login: function(user) {
        var deferred = $q.defer();

        $http.post('/auth/local', {
          email: user.email,
          password: user.password
        }).
        success(function(data) {
          $cookieStore.put('token', data.token);
         // currentUser = User.get();
          deferred.resolve(data);
        }).
        error(function(err) {
          //this.logout();
          deferred.reject(err);
        }.bind(this));

        return deferred.promise;
      }
    };
  });