'use strict';

var should = require('should');
var fount = require( 'fount' );

var request = require('supertest');
var async = require('async');

describe('Twitter post', function() {

    beforeEach(function(){
        require('./twitter.service')(fount);
    });

    it('should post image on twitter', function(done) {
        this.timeout(5000);
        fount.resolve( 'twitter_service' )
            .then( function( twitter_service ) {
                twitter_service.postImage({
                        consumer_key: 'JYLM8pj9WxSP7xRyptfR4w',
                        consumer_secret: '0CXU4Kn4sH1hOFuQeAG97jcRVFpzvOnncg5QuXKWA',
                        access_token: '773792-Z7ZgjRlV3FTgH2CsJ0uKyrywLmogkZU6HozpwLPke2K',
                        access_token_secret: 'kZzRbRaX4zwFZs95kXj4NPMKCH14ckLJjYy26NmgquhPw',
                        message: 'A simple test'
                },
                    '/Users/fabrizio/GitLab/self-o-matic-api/server/services/tasks/image/test.jpg')
                .then(function(res){
                    console.log('res ' + res);
                    done();
                },
                function(err){
                   console.log('err ' + err);
                });

            });

    });
});