'use strict';

var LoginPage = function(url) {

    this.setUsername = function(user){
        username.sendKeys(user);
    };

    this.setPassword = function(pass){
        password.sendKeys(pass);
    }

    this.login = function(){
        button.click();
    };

    browser.get(url);
    var username = element(by.model('user.username'));
    var password = element(by.model('user.password'));
    var button = element(by.tagName('button'));

};

module.exports = LoginPage;