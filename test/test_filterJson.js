'use strict'

var assert = require('assert');
var filterJsonObj = require('../lib/filterJson');

describe('filterjson module tests', function() {
    var fixureObject ;

    before(function () {
        fixureObject = require('./fixures/filterjson');
    });

    it('should throw error if object is empty / payload not available', function() {
    	var responseJsonObj = filterJsonObj.filteredJson(fixureObject.emptyRequest, function(error){
            assert.equal(error.message,"Could not decode request: JSON parsing failed");
        });
    });

    it('should throw error if payload is not an array', function() {
    	var responseJsonObj = filterJsonObj.filteredJson(fixureObject.emptyPayload, function(error){
            assert.equal(error.message,"Could not decode request: JSON parsing failed");
        });
    });

    it('should get valid response', function() {
    	var err = new Error('Invalid request object');
    	var responseJsonObj = filterJsonObj.filteredJson(fixureObject.validRequestJson);
    	assert.equal(responseJsonObj.response[1].slug, "show/thetaste");
    	assert.equal(responseJsonObj.response[1].image, "http://mybeautifulcatchupservice.com/img/shows/TheTaste1280.jpg");
    	assert.equal(responseJsonObj.response[1].title, "The Taste");
    });
    it('should get valid response if episode count is 0 and drm is true', function() {
    	var err = new Error('Invalid request object');
    	var responseJsonObj = filterJsonObj.filteredJson(fixureObject.episodeCount);
    	assert.equal(responseJsonObj.response[1].slug, "slug2");
    	assert.equal(responseJsonObj.response[1].image, "showImage2");
    	assert.equal(responseJsonObj.response[1].title, "title2");
    });

});
