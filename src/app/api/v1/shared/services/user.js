/**
 * Business API Service Call
 * Tracking data
 *
 *
 */

'use strict'

var apiCall = require('./apiCall');
let user = {};

user.get = function(headers){
	const options = {
		uri: apiCall.baseUrl +"api/v3/users",
		headers: apiCall.parseHeaders(headers),
		json: true,
		gzip: true,
		timeout: 10000
	};

	return apiCall.get(options);
};

module.exports = user;
