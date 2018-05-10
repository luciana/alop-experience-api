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
		uri: apiCall.baseUrl +"api/v3/progress",	
		headers: apiCall.parseHeaders(headers),
        json: true,
        timeout: 5000
    };

	return apiCall.get(options);
};

progress.getAll = function(headers){
	const options = {
		uri: apiCall.baseUrl +"api/v3/progress/all",	
		headers: apiCall.parseHeaders(headers),
        json: true,
        timeout: 100000
    };

   	return apiCall.get(options);
};

module.exports = progress;
