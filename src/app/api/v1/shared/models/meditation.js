/**
 Provide Api for Home

    User model - returns observables

**/


'use strict'
require('rxjs/Rx');
const Observable = require('rxjs/Observable').Observable,
        client = require('./client'),
        configModule = require('config');

const meditationService = require('../services/meditation'),
        meditationMapping = require('../mappings/meditation'),
        loggingService = require('../services/logging'),
        loggingModel = require('../models/logging'),
        tracker = require('../middleware/tracker');

const REDIS_MEDITATION_CACHE = "alop-adapter-meditation";

let meditation = {};

meditation.get$ = (req, res) => {
     const key = meditation.getKeyFor(REDIS_MEDITATION_CACHE, req.headers);
     const callMeditationService$ = meditationService.get(req.headers)
                            .catch((error)=>{
                                return meditation.getDefault$;
                            })                          
                            .map((data) => meditationMapping.transform(data))
                            .do((data) => {
                                //client.setex(key, configModule.get('REDIS_CACHE_TIME'), JSON.stringify(data));
                            })
                            .catch((error) => {                                  
                                    loggingModel.logWithLabel("meditation Data Transform - Return meditation default. Calling meditation Service", error, tracker.requestID, "ERROR");
                                    return meditation.getDefault$;
                            });

    const cacheIsRetrieved$ = client.getCachedDataFor$(key)
                                .filter((value) => value)
                                .catch((error) => {                                       
                                    loggingModel.logWithLabel("meditation Data Transform - Return meditation default. There was data in cache.", error, tracker.requestID, "ERROR");
                                    return meditation.getDefault$;
                                });

    const cacheIsNotRetrieved$ =client.getCachedDataFor$(key)
                                .filter((value) => !value)                               
                                .switchMap(() => callMeditationService$)
                                .catch((error) => {                                   
                                    loggingModel.logWithLabel("meditation Data Transform - Return meditation default. There was not data in cache", error, tracker.requestID, "ERROR");
                                    return meditation.getDefault$;
                                });
                               
    return Observable.merge(cacheIsRetrieved$,cacheIsNotRetrieved$);
    	// return meditationService.get(req.headers)
     //            .catch((error) => {
     //                if (error.statusCode === 401){  
     //                    loggingModel.logWithLabel("Meditation Service API 401 Return meditation default", error, tracker.requestID , "ERROR");           
     //                    return Observable.of(meditationMapping.getDefault());
     //                }else{                  
     //                    loggingModel.logWithLabel("Meditation Service API Return from cache", error, tracker.requestID , "ERROR");
     //                    return client.getCachedDataFor$(key);
     //                }
     //            })                
             
     //            .map((data) => meditationMapping.transform(data))    
      //            .do((data) => {
     //                //console.log("set cache ", REDIS_MEDITATION_CACHE);                   
     //                client.setex(key, configModule.get('REDIS_CACHE_TIME'), JSON.stringify(data));
     //            })  
     //            .catch((error) => {                            
     //                loggingModel.logWithLabel("Meditation Data Transform Return meditation default", error, tracker.requestID, "ERROR");
     //                return Observable.of(meditationMapping.getDefault());
     //            });
};

meditation.getDefault$ = () =>{
    return Observable.of(meditationMapping.getDefault());
};

meditation.getKeyFor = (key, headers) =>{
    const { authorization } = headers;
    return key + authorization;
};

module.exports = meditation;
