/**
 * Business API Service Call
 * Progress data
 *
 *
 */

'use strict'

var apiCall = require('./apiCall');
let progress = {};

progress.get = function(headers){
	const options = {
		uri: apiCall.baseUrl +"api/v3/progresss",	
		headers: apiCall.parseHeaders(headers),
        json: true,
        timeout: 5000
    };

	return apiCall.get(options);
};

module.exports = progress;
