/**
 * NodeJS/Express REST API Starter Kit
 *
 *
 *
 */

var app = require('./src/app/index');

var port = process.env.PORT || 8080;
var server = app.listen(port, function() {
    console.log("server running on port", port);
});

server.timeout = 30000;