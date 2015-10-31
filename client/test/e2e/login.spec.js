'use strict';

var LoginPage = require('./pages/login.page.js');


describe('Login', function() {
    var loginPage;

    beforeEach(function() {
        loginPage  = new LoginPage('#/login');
    });

	it('should have a title', function() {
		browser.get('/');

		expect(browser.getTitle()).toEqual('Self-O-Matic Admin');
	});

    it('should login', function(){

        loginPage.setUsername('guglielmino@gmail.com');
        loginPage.setPassword('d8r6co');

        loginPage.login();

        expect(browser.getCurrentUrl()).not.toEqual('/login');

    })
});
