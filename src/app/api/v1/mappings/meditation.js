/**
 * Mapping File
 *
 *
 *
 */

'use strict'


class meditation {
    transform(data){
    	return data.meditations.assets.map((item) => {
				var result = {};
				result.id = item.id;
				result.title = item.title;
				result.duration = item.duration + " min";
				result.path = item.path;
				return result;
		});
    }
}

module.exports = new meditation();
