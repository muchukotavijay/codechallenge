'use strict';

// initiate the self object to {} to export with functions

var self = {};
var _ = require('lodash');
/**
 * @function filteredJson
 * Given an input json form another module returns filtered json response
 * 
 *
 * @param   {Object}   requestJson
 *
 * @returns {Object}   responseObject
 *
 */

self.filteredJson = function(requestJson,callback) {

    // initilizing required variables
    var responseArray = [],
        responseObject = {},
        requiredFields = ["image", "slug", "title"],
        conditionalFields = ["episodeCount", "drm"];

    // sample data for testing
    // requestJson = { "payload": [{ "country": "UK", "description": "What life like when you have enough children to field your own football team?", "drm": true, "episodeCount": 3, "genre": "Reality", "image": { "showImage": "http://mybeautifulcatchupservice.com/img/shows/16KidsandCounting1280.jpg" }, "language": "English", "nextEpisode": null, "primaryColour": "#ff7800", "seasons": [{ "slug": "show/16kidsandcounting/season/1" }], "slug": "show/16kidsandcounting", "title": "16 Kids and Counting", "tvChannel": "GEM" }, { "slug": "show/seapatrol", "title": "Sea Patrol", "tvChannel": "Channel 9" }] };

    // requestJson object check and the payload array check if empty returning Error object

    if (!(_.isObject(requestJson)) || !_.isArray(requestJson.payload)) {
        callback(new Error("Could not decode request: JSON parsing failed"));
        return;
    }

    // if payload is valid array 

    requestJson.payload.forEach(function(obj) {
        var respObject = {};
        var count = 0;
        for (var property in obj) {
            if (obj.hasOwnProperty(property)) {
                if ((_.indexOf(requiredFields,property) > -1) && obj[conditionalFields[0]] > 0 && obj[conditionalFields[1]]) {
                    if (_.isObject(obj[property])) {
                        var newObj = obj[property];
                        respObject[property] = newObj[_.keys(newObj)[0]];
                        count++;
                    } else {
                        respObject[property] = obj[property];
                        count++;
                    }

                }
            }
        }

        // if count is equal to length of requiredfileds array then adding to responseArray
        if (count === requiredFields.length) {
            responseArray.push(respObject);
        }

    });
    responseObject.response = responseArray;
    return responseObject;
};

module.exports = self;
