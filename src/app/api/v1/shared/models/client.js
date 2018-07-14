
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
    configModule = require('config');

const redis_url = configModule.get('REDISTOGO_URL');
console.log("redis_url", redis_url);
if (redis_url){   
	var rtg   = require("url").parse(redis_url);
	var client = redis.createClient(rtg.port, rtg.hostname);
	client.auth(rtg.auth.split(":")[1]);
}else{  
	var client = redis.createClient();
}

client.on('error', (err)=>{
	console.log('error creating to redis client' , err);
});


client.getCachedDataFor$ = (key) => {   
     return Observable.create( observer => {
        client.get(key, (error, result) => {
            var value = null;
            if(result){               
                let level = "INFO";
                let id = "123";
                let logEntry = "Client cache data retrieved for " + key + " with " + level +" for request id " +id;
                console.log(logEntry);
               // loggingModel.logWithLabel("Cache retrieved for  ", key, id, level);
                value = JSON.parse(result);
               
            }else {
                let level = "WARNING";
                let id = "123";
                let logEntry = "Client has no cache data for " + key + " with " + level +": for request id " +id + " with error " + error;
                // console.log(logEntry);
                // loggingModel.logWithLabel("Cache data not available for ", key + error, id, level);
                // observer.error(error);                
            }
            observer.next(value);
            observer.complete();
        });
    });
};

module.exports = client;