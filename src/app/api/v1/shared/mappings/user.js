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
            "status": null,
            "active_until": null,
            "type": "TRIAL",
            "plan_name": "Free",
            "plan_text": null,
            "plan_info": null
        }];
        let defaultBadgeImage = 'https://www.alotofpilates.com/assets/badges/badge4.png';
        result.id = data.id || 0;
        result.name = data.name || "Friend";        
        result.email = data.email || "";
        result.sign_in_count = data.sign_in_count || 1;
        result.greeting_text = user.countGreeting(result.sign_in_count, result.name);
        result.created_at = data.created_at || new Date().toISOString();
        result.location = data.location || null;
        result.subscriptions = data.subscriptions || defaultSubs;
        result.subscriptions[0].plan_text = "Your plan is the " + result.subscriptions[0].plan_name + " Plan";
        var info = "";
        var planAction = "";
        var planActionId = 0;
        const trial = new Date(data.trial_end_date);
        if(user.isPaid(result)){
            const active_until =  new Date(result.subscriptions[0].active_until);
             if(active_until){
                info = "Subscription active until " + (active_until.getMonth() + 1) + '/' + active_until.getDate() + '/' +  active_until.getFullYear();
                planAction = "";
             }
        }else if (trial){
            if(trial < new Date() ){
                info = "Your trial period is over.";
            }else {
                info = "Your trial end date is " + (trial.getMonth() + 1) + '/' + trial.getDate() + '/' +  trial.getFullYear();
            }
            planAction = "Become a member";
            planActionId = 1;
        }
        result.subscriptions[0].plan_action= planAction;
        result.subscriptions[0].plan_action_id= planActionId;
        result.subscriptions[0].plan_info = info;
        result.badge_text = data.badge_text || 'Newbie Badge';
        result.badge_image = data.badge_image || defaultBadgeImage;
        result.favorites_count = data.favorites_count || 0;
        result.custom_class_count = data.custom_class_count || 0;
        result.workout_taken_count = data.workout_taken_count || 0;
        results.user = result;
        return results;
};

user.isPaid = (user) => {
        return user.subscriptions[0].plan_id == 2 || user.subscriptions[0].plan_id == 3;
};

user.countGreeting = (signInCount, name) => {
    if (signInCount > 1) {
        return "Welcome back, " + name;
    } else {
        return "Welcome " + name;
    }
};

user.timeGreeting =(name) =>{
    let n = new Date();   
    console.log("current server time " + n.toString());
    let hrs = n.getHours();

    if (hrs < 12) {
       return 'Good Morning, ' + name;
    }else if (hrs >= 12 && hrs <= 17) {
        return 'Good Afternoon, '  + name;
    }else if (hrs >= 17 && hrs <= 24) {
        return 'Good Evening, ' + name;
    } else {
        return 'Welcome '+ name;
    }
};

user.getDefault = () =>{
    let results = {};
    var result = {};  
    let defaultSubs =  [{
            "id": 0,
            "plan_id": 1,
            "status": null,
            "active_until": null,
            "type": "TRIAL",
            "plan_name": "Free",
            "plan_text": null,
            "plan_info": null
        }];
    let defaultBadgeImage = 'https://www.alotofpilates.com/assets/badges/badge4.png';
    result.id = 0;
    result.name = " Friend";   
    result.email = "";
    result.sign_in_count = 1;
    result.greeting_text = user.countGreeting(result.sign_in_count, result.name);
    result.created_at = new Date().toISOString();
    result.location = null;
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
