/**
 * Mapping File
 *
 *
 *
 */

'use strict'


class user {
    transform(data){
        var result = {};       
        result.id = data.id;
        result.name = data.name;
        result.email = data.email;
        result.sign_in_count = data.sign_in_count || 1;
        result.created_at = data.created_at;
        result.location = data.location || "";
        result.subscriptions = data.subscriptions;
        result.badge_text = data.badge_text;
        result.badge_image = data.badge_image;
        result.favorites_count = data.favorites_count;
        result.custom_class_count = data.custom_class_count;
        result.workout_taken_count = data.workout_taken_count;
        return result;
    }
}

module.exports = new user();
