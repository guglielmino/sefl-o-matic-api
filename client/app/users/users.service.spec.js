'use strict';

describe('Service: UserService', function () {

    var UserService, httpBackend;
    // load the controller's module
    beforeEach(module('somapp.users'));
    // Inject the service
    beforeEach(inject(function (_UserService_, $httpBackend) {
        UserService = _UserService_;
        httpBackend = $httpBackend;
    }));


    it('should get all users', function () {

        UserService.getUsers()
            .then(function (result) {
                console.log('BUONO');
            }, function (err) {
                console.log('NO BUONO');
            });
    });
});
