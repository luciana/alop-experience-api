/**
 * Mapping File
 *
 *
 *
 */

'use strict'


class workout {
    transform(data){    	   
		return data.map((item) => {
				var result = {};
				result.id = item.id;
				result.title = item.title;
				result.description = item.content;				
				result.instructor_name= item.instructor.name;
				result.instructor_path = item.instructor.url;
				result.duration = item.duration.description;
				result.category = item.category.name;
				return result;
		});

    }
}

module.exports = new workout();
