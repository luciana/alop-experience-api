/**
 * Mapping File
 *
 *
 *
 */

'use strict'

let user = {};
user.transform = (data) => {      
        let results = {};
        var result = {};       
        //let defaultSubs = [{"id":0, "plan_id":1, "status": "", "active_until": "", "type": "FREE", "plan_name":""}];
        let defaultSubs =  [{
            "id": 0,
            "plan_id": 1,
            "status": "active",
            "active_until": "",
            "type": "TRIAL",
            "plan_name": "Free"
        }];
        let defaultBadgeImage = 'https://www.alotofpilates.com/assets/badges/badge4.png';
        result.id = data.id || 0;
        result.name = data.name || "Hello";
        result.email = data.email || "";
        result.sign_in_count = data.sign_in_count || 1;
        result.created_at = data.created_at || new Date().toISOString();
        result.location = data.location || "";
        result.subscriptions = data.subscriptions || defaultSubs;
        result.badge_text = data.badge_text || 'Newbie Badge';
        result.badge_image = data.badge_image || defaultBadgeImage;
        result.favorites_count = data.favorites_count || 0;
        result.custom_class_count = data.custom_class_count || 0;
        result.workout_taken_count = data.workout_taken_count || 0;
        results.user = result;
        return results;
};

user.getDefault = () =>{
    let results = {};
    var result = {};  
    let defaultSubs =  [{
            "id": 0,
            "plan_id": 1,
            "status": "active",
            "active_until": "",
            "type": "TRIAL",
            "plan_name": "Free"
        }];
    let defaultBadgeImage = 'https://www.alotofpilates.com/assets/badges/badge4.png';
    result.id = 0;
    result.name = "New Friend";
    result.email = "";
    result.sign_in_count = 1;
    result.created_at = new Date().toISOString();
    result.location = "";
    result.subscriptions = defaultSubs;
    result.badge_text = 'Newbie Badge';
    result.badge_image = defaultBadgeImage;
    result.favorites_count = 0;
    result.custom_class_count = 0;
    result.workout_taken_count = 0;
    results.user = result;   
    return results;
};


module.exports = user;
