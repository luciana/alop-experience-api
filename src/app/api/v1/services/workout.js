/**
 * Business API Service Call
 * Workout data
 *
 *
 */

'use strict'

var apiCall = require('./apiCall');
let workout = {};

workout.get = function(headers){
	const options = {
		uri: apiCall.baseUrl +"api/v3/workouts/recommendations?limit=3&status=active&duration=1,2,3",	
		headers: apiCall.parseHeaders(headers),
        json: true
    };


	return apiCall.get(options);
};

module.exports = workout;
