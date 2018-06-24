/**
 * Mapping File
 *
 *
 *
 */

'use strict'


let workout = {};

workout.transform = (data) => {
    	let results = [];
		let result = data.map((item) => {
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
		results.workouts = result;
		return results;
};

workout.transformLimited = (data) =>{     
		return data.map((item) => {
				var result = {};
				var i = item.id;
				result.id = '"' + i + '"' ;
				result.name = item.title;		
				return result;
		});

};

workout.getDefault = () => {
	return JSON.parse('{"workouts": [{"category": "Pilates","description": "","duration": "10-20 minutes","id": 530,"instructor_name": "Jodi Brinkman","instructor_path": "https://www.alotofpilates.com/instructors/1","title": "Basic Beginner Pilates Class"},{"category": "Stretching","description": "","duration": "10-20 minutes","id": 524,"instructor_name": "Colleen McGill","instructor_path": "https://www.alotofpilates.com/instructors/2","title": "Stretch and Breathe"},{"category": "Pilates","description": "","duration": "10-20 minutes","id": 654,"instructor_name": "Colleen McGill","instructor_path": "https://www.alotofpilates.com/instructors/2","title": "Simple and Effective"},{"category": "Power Pilates","description": "","duration": "10-20 minutes","id": 519,"instructor_name": "Colleen McGill","instructor_path": "https://www.alotofpilates.com/instructors/2","title": "Power Core"}]}');
};

module.exports = workout;
