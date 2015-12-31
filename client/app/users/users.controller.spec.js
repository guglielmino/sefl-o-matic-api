'use strict';

describe('Controller: UserController', function () {
    var $controller, userService, $rootScope;

    beforeEach(module('somapp'));
    beforeEach(module('somapp.users'));



    beforeEach(inject(function(_$controller_, _$rootScope_, UserService, $q) {
        // The injector unwraps the underscores (_) from around the parameter names when matching
        $controller = _$controller_;
        userService = UserService;

        spyOn(userService, "getUsers").and.callFake(function() {
            var deferred = $q.defer();
            deferred.resolve([{
                provider: "local",
                name: "Fabry",
                email: "guglielmino@gmail.com",
                role: "admin"
            }]);
            return deferred.promise;
        });


        $rootScope = _$rootScope_;
    }));

    it('Should get all users', function() {
        var controller = $controller('UsersCtrl', {$rootScope: $rootScope, UserService: userService});
        $rootScope.$digest();
        expect(userService.getUsers).toHaveBeenCalled();
        expect(controller.users instanceof Array).toBeTruthy();
        expect(controller.users.length).toBeGreaterThan(0);

    });
});