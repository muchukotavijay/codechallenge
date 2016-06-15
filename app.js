var express = require('express');
var bodyParser = require('body-parser');

var routes = require('./lib/index');

var app = express();

// parse request body
app.use(bodyParser.json());

// To handle invalid json
app.use(function(error, req, res, next) {
    if (error instanceof SyntaxError) {
        res.status(400);
        responseObject = { error: 'Could not decode request: JSON parsing failed' };
        res.send(responseObject);
    } else {
        next();
    }
});

// parse request body
app.use(bodyParser.urlencoded({ extended: true }));

// sets port if any platform service port available then it will use that if not 9001
app.set('port', (process.env.PORT || 9001));

// routes
app.use('/', routes);

app.listen(app.get('port'), function() {
    console.log('Code app is running at port', app.get('port'));
});


// parse request body
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

// set port if any platform service port available then it will use that if not 9001
app.set('port', (process.env.PORT || 9001));

