'use strict';

describe('Service: UserService', function () {

    var userService, httpBackend, $rootScope;

    var usersJson = [
        {
            provider: "local",
            name: "Fabry",
            email: "guglielmino@gmail.com",
            role: "admin"
        }
    ];

    beforeEach(angular.mock.module('somapp'));
    beforeEach(module('somapp.users'));
    beforeEach(module('ngMockE2E'));

    beforeEach(inject(function (UserService, _$httpBackend_, _$rootScope_) {
        userService = UserService;
        httpBackend = _$httpBackend_;
        $rootScope = _$rootScope_;
    }));

    it('should get all users', function (done) {
        httpBackend
            .expectGET('/api/users')
            .respond(usersJson);

        userService.getUsers()
            .then(function (users) {
                console.log(users);
                expect(users).not.toBe(undefined);
                expect(users.length).toBeGreaterThan(0);
                done();
            });

        expect(httpBackend.flush).not.toThrow();
    });
});
