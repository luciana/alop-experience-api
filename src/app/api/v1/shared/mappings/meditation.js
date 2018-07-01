/**
 * Mapping File
 *
 *
 *
 */

'use strict'


let meditation = {};


meditation.transform = (data) => {
    	var results = {};    	
    	var result = {};

    	result =  data.meditations.assets.map((item) => {
				var result = {};
				result.id = item.id;
				result.title = item.title;
				result.duration = item.duration + " min";
				result.path = item.path;
				return result;
		});		
		results.meditations = result;
		return results; 
};

meditation.getDefault = () => {
	return JSON.parse('{"meditations":[{"id":1,"title":"Muscle-Tension Release Meditation","duration":"14.25 min","path":""}]}');
};

module.exports = meditation;