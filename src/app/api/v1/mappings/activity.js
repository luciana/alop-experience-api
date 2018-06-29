/**
 * Mapping File
 *
 *
 *
 */

'use strict'


class mappings {

    count_classes_taken_on(startDate, endDate, tracking){
        return tracking.filter(function (item) {
                    var date = new Date(item.created_at); 
                    return date >= startDate && date <= endDate;   
        }).length
        //}).length.toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false})
    };

    count_minutes_taken_on(startDate, endDate, data){  
        return data.filter(function (item) {
                    var date = new Date(item.created_at); 
                    return date >= startDate && date <= endDate;
        }).map((item) => {                      
           return item.workout.audio_time;
        }).reduce((total, seconds) => total + Math.floor(seconds / 60), 0)
    };

    recent_activities(limit, data){
        return data.slice(0,limit).map((d) => {
            var result = {};
            result.activity_id = d.id;
            result.progress = 100;
            result.workout_id = d.workout.id;
            result.workout_taken_on = d.created_at;
            result.workout_title = d.workout.title;
            result.workout_audio_time = d.workout.audio_time;
            result.workout_duration = d.workout.duration.description;
            return result;
        });
    }

    monthly_activities(data){      
        return data.filter((item) => {
            var activity_date = new Date(item.created_at); 
            var date = new Date();
            var fd = new Date(date.getFullYear(), date.getMonth(), 1);
            var ld = new Date(date.getFullYear(), date.getMonth() + 1, 0);
            return activity_date >= fd && activity_date <= ld;
        })
        .map((d) => {
            var result = {};
            result.activity_id = d.id;
            result.workout_id = d.workout.id;
            result.progress = 100;
            result.workout_taken_on = d.created_at;
            result.workout_title = d.workout.title;
            result.workout_audio_time = d.workout.audio_time;
            result.workout_duration = d.workout.duration.description;
            return result;
        });
    }

     get_classes_taken_this_week(data){
        var date = new Date();
        var fd = new Date(date.getTime() - 60*60*24* date.getDay()*1000);
        var ld = new Date(date.getTime() + 60 * 60 *24 * 6 * 1000);
        return this.count_classes_taken_on(fd,ld,data)
    }

    get_classes_taken_this_month(data){
     var date = new Date();
     var fd = new Date(date.getFullYear(), date.getMonth(), 1);
     var ld = new Date(date.getFullYear(), date.getMonth() + 1, 0);
     return this.count_classes_taken_on(fd,ld,data);
    }

    get_classes_taken_this_year(data){
     var date = new Date();
     var fd = new Date(date.getFullYear(), 1, 0);
     var ld = new Date(date.getFullYear(), 12, 0);
     return this.count_classes_taken_on(fd,ld,data);
    }

    get_minutes_taken_this_week(data){
        var date = new Date();
        var fd = new Date(date.getTime() - 60*60*24* date.getDay()*1000);
        var ld = new Date(date.getTime() + 60 * 60 *24 * 6 * 1000);
        return this.count_minutes_taken_on(fd,ld,data);
    }

    get_minutes_taken_this_month(data){
        var date = new Date();
        var fd = new Date(date.getFullYear(), date.getMonth(), 1);
        var ld = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        return this.count_minutes_taken_on(fd,ld,data);
    }

    get_minutes_taken_this_year(data){
        var date = new Date();
        var fd = new Date(date.getFullYear(), 1, 0);
        var ld = new Date(date.getFullYear(), 12, 0);
        return this.count_minutes_taken_on(fd,ld,data);
    }

}

let activity = {};

activity.transform = (data) =>{
        let results = {};
        let result = {};
        var m = new mappings();
        result.classes_taken_this_week = m.get_classes_taken_this_week(data);
        result.minutes_taken_this_week = m.get_minutes_taken_this_week(data);
        result.classes_taken_this_month = m.get_classes_taken_this_month(data);
        result.minutes_taken_this_month = m.get_minutes_taken_this_month(data);
        result.classes_taken_this_year = m.get_classes_taken_this_year(data);
        result.minutes_taken_this_year = m.get_minutes_taken_this_year(data);
        result.recent_activities = m.recent_activities(4,data);  
        result.monthly_activities = m.monthly_activities(data);   
        results.activities = result;   
        return results;
    }

activity.getDefault = () => {
    let results = {};
    var result = {};  
    
    result.classes_taken_this_month = 0;
    result.classes_taken_this_week = 0;
    result.classes_taken_this_year = 0;
    result.minutes_taken_this_month = 0;
    result.minutes_taken_this_week = 0;
    result.minutes_taken_this_year = 0;
    result.recent_activities = [];
    result.monthly_activities = [];    
    results.activities = result;
    return results;
};
  

module.exports = activity;
