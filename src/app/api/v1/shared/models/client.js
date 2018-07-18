
/**
 * Redis client
 *
 *
 *
 */

'use strict'
const redis = require('redis'),
	Observable = require('rxjs/Observable').Observable,
	loggingModel = require('../models/logging'),
    configModule = require('config'),
    tracker = require('../middleware/tracker');

const redis_url = configModule.get('REDISTOGO_URL');

if (redis_url){
	var rtg   = require("url").parse(redis_url);
	var client = redis.createClient(rtg.port, rtg.hostname);
	client.auth(rtg.auth.split(":")[1]);
}else{  
	var client = redis.createClient();
}

client.on('error', (error)=>{
    loggingModel.logWithLabel("Error creating to redis client ", error, tracker.requestID, "ERROR");
});

client.getCachedDataFor$ = (key) => {   
     return Observable.create( observer => {
        client.get(key, (error, result) => {
            var value = null;
            if(result){               
                value = JSON.parse(result);
            }
            observer.next(value);
            observer.complete();
        });
    });
};

module.exports = client;