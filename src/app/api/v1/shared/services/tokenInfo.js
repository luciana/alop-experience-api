/**
 * Business API Service Call
 * oauth/token/info?
 * validate token
 *
 */

'use strict'

var apiCall = require('./apiCall');
let tokenInfo = {};

tokenInfo.get = function(headers){

	const { authorization } = headers;

	const options = {
		uri: apiCall.baseUrl + 'oauth/token/info?access_token=' + authorization,
		headers: apiCall.parseHeaders(headers),
        json: true,
        timeout: 4000
    };

	return apiCall.get(options);
};

module.exports = tokenInfo;