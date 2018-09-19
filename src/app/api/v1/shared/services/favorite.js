/**
 * Business API Service Call
 * Favorites data
 *
 *
 */

'use strict'

var apiCall = require('./apiCall');
let favorite = {};

favorite.get = function(headers){
	const options = {
		uri: apiCall.baseUrl + 'api/v3/workouts/favorites',	
		headers: apiCall.parseHeaders(headers),
        json: true,
        gzip: false,
        timeout: 4000
    };

	return apiCall.get(options);
};

module.exports = favorite;
