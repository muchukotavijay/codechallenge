var express = require('express');
var app = express();
var _ = require('lodash');
var bodyParser = require('body-parser');
var filterJson = require('./lib/filterJson');


// parse request body
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

// set port if any platform service port available then it will use that if not 9001
app.set('port', (process.env.PORT || 9001));

/**
 * @function filteredJson
 * Accepts requests from external client and response with filtered json object
 * 
 *
 * @param   {Object}   request
 *
 * @returns {Object}   response
 *
 */

app.all('/*', function(req, res) {

    // initilizing variables
    var requestJson = req.body;
    var responseObject = {};
    var errorResponseObject = { "error": "" };

    // callback to reply with error message for invalid request 
    res.setHeader('Content-Type', 'application/json');
    responseObject = filterJson.filteredJson(requestJson, function(error) {
        res.status(400);
        errorResponseObject.error = error.message;
        res.send(JSON.stringify(errorResponseObject));
        return;
    });

    if (!(_.isEmpty(responseObject))) {
        res.status(200);
    }
    res.send(JSON.stringify(responseObject));
});

app.listen(app.get('port'), function() {
    console.log('Code app is running at port', app.get('port'));
});
