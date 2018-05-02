/**
 * Business API Service Call
 * Tracking data
 *
 *
 */

'use strict'

var apiCall = require('./apiCall');
let tracking = {};

tracking.get = function(headers){
	const options = {
		uri: apiCall.baseUrl +"api/v3/trackings",	
		headers: apiCall.parseHeaders(headers),
        json: true,
        timeout: 5000
    };

	return apiCall.get(options);
};

module.exports = tracking;
