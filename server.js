/**
 * NodeJS/Express REST API Starter Kit
 *
 *
 *
 */

var app = require('./src/app/index');

var port = process.env.PORT || 8080;
var env = process.env.NODE_ENV || "production";
var server = app.listen(port, function() {
    console.log("server running on port", port + " - " + env);
});
server.on('error', function(err){
	console.log("Generic error in Experience API - fix it!", err);
	throw err;
});
server.timeout = 30000;

module.exports = server;