/**
 * Mapping File
 *
 *
 *
 */

'use strict'


class meditation {
    transform(data){
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
    }
}

module.exports = new meditation();
