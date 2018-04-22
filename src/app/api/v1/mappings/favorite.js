/**
 * Mapping File
 *
 *
 *
 */

'use strict'


class mappings {


    recent_activities(limit, data){
        return data.slice(0,limit).map((d) => {
            var result = {};
            result.favorite_id = d.id;           
            result.workout_id = d.workout.id;
            result.favorited_on = d.created_at;
            result.workout_title = d.workout.title;
            result.workout_audio_time = d.workout.audio_time;
            result.workout_duration = d.workout.duration.description;
            return result;
        });
    }

}

class favorite {
    transform(data){
        var result = {};
        var m = new mappings();
        result.favorites = m.recent_activities(4,data);
        return result;
    }
}
  

module.exports = new favorite();
