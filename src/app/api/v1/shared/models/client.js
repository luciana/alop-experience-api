
/**
 * Redis client
 *
 *
 *
 */

'use strict'
const redis = require('redis'),
	Observable = require('rxjs/Observable').Observable,
	loggingModel = require('../models/logging');

if (process.env.REDISTOGO_URL){
	var rtg   = require("url").parse(process.env.REDISTOGO_URL);
	var client = redis.createClient(rtg.port, rtg.hostname);
	client.auth(rtg.auth.split(":")[1]);
}else{
	var client = redis.createClient();
}

client.on('error', (err)=>{
	console.log('error creating to redis client' , err);
});


client.getCachedDataFor$ = (key) => {     
    console.log("get data from cache" , key);
     return Observable.create( observer => {
        client.get(key, (error, result) => {
            if(result){
                let level = "INFO";
                let id = "123";
                let logEntry = "Client cache data retrieved for " + key + " with " + level +" for request id " +id;
                console.log(logEntry);
                loggingModel.logWithLabel("Cache retrieved for  ", key, id, level);
                observer.next(JSON.parse(result));
                observer.complete();
            }else {
                let level = "WARNING";
                let id = "123";
                let logEntry = "Client has no cache data for " + key + " with " + level +": for request id " +id + " with error " + error;
                loggingModel.logWithLabel("Cache data not available for ", key + error, id, level);                
                observer.error(error);
            }
        });
    });
};

module.exports = client;