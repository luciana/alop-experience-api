/**
 * Business API Service Call
 * Meditation data
 *
 *
 */

'use strict'

var apiCall = require('./apiCall');
let meditation = {};

meditation.get = function(headers){
	const options = {
		uri: apiCall.baseUrl + 'api/v3/meditations/1',	
		headers: apiCall.parseHeaders(headers),
        json: true,
        gzip: true,
        timeout: 2000
    };

	return apiCall.get(options);
};

module.exports = meditation;
