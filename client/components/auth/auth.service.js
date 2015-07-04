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
      },

         /**
       * Waits for currentUser to resolve before checking if user is logged in
       */
      isLoggedInAsync: function(cb) {
        if(currentUser.hasOwnProperty('$promise')) {
          // TODO: Da gestire con l'istanza utente
          cb(true);
          /*
          currentUser.$promise.then(function() {
            cb(true);
          }).catch(function() {
            cb(false);
          });*/
        } else if(currentUser.hasOwnProperty('role')) {
          cb(true);
        } else {
          cb(false);
        }
      },

      /**
       * Gets all available info on authenticated user
       *
       * @return {Object} user
       */
      getCurrentUser: function() {
        // TODO: Da gestire con il current user
        return {};
        //return currentUser;
      },

       /**
       * Check if a user is logged in
       *
       * @return {Boolean}
       */
      isLoggedIn: function() {
        // TODO: Da gestire con il current user
        return true;
        //return currentUser.hasOwnProperty('role');
      },

      /**
       * Check if a user is an admin
       *
       * @return {Boolean}
       */
      isAdmin: function() {
        // TODO: Da gestire con il current user
        return true;
        //return currentUser.role === 'admin';
      },

      /**
       * Get auth token
       */
      getToken: function() {
        return $cookieStore.get('token');
      }


    };
  });