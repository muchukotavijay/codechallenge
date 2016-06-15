var express = require('express');
var filterJson = require('./filterJson');

var router = express.Router();


router.get('/', function(req, res) {
    res.send('try post');
});

/**
 * @function filteredJson
 * Accepts requests from client and response with filtered json object
 * 
 *
 * @param   {Object}   request
 *
 * @returns {Object}   response
 *
 */

router.post('/', function(req, res) {
    var requestObject = req.body;
    var responseObject = {};

    if (router.validateRequest(requestObject, function(error) { res.status(400);
            responseObject = { error: error.message }; })) {
        responseObject = filterJson.filteredJson(requestObject);
    }

    res.send(responseObject);
});

/**
 * @function validateRequest
 * To validate request object
 * 
 *
 * @param   {Object}   requestObject
 * @param   {Function}   
 *
 * @returns {Boolean}   isValid
 *
 */

router.validateRequest = function(requestObject, callback) {
    var isValid = false;

    // requestObject is not an object | payload is not an array | if payloaod is empty
    if (!Object.keys(requestObject).length || !Array.isArray(requestObject.payload) || !(requestObject.payload.length)) {
        callback(new Error('Could not decode request: JSON parsing failed'));
    } else {
        isValid = true;
    }

    return isValid;
};

module.exports = router;
