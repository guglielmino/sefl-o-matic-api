'use strict';

var should = require('should');
var fount = require( 'fount' );

var request = require('supertest');
var chalk = require('chalk');
var async = require('async');

describe('Image processing', function() {

    beforeEach(function(){
        require('./image-proc.service')(fount);
    });

    it('should create watermarked image', function(done) {

        fount.resolve( 'img_processing' )
            .then( function( img_processing ) {
                img_processing.watermarkImage({}, '/Users/fabrizio/GitLab/self-o-matic-api/server/services/tasks/image/test.jpg');
                done();
            });

    });
});