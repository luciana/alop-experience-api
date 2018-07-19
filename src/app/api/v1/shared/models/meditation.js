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
     let key = meditation.getKeyFor(REDIS_MEDITATION_CACHE, req.headers);
    	return meditationService.get(req.headers)
                .catch((error) => {
                    if (error.statusCode === 401){  
                        loggingModel.logWithLabel("Meditation Service API 401 Return meditation default", error, tracker.requestID , "ERROR");           
                        return Observable.of(meditationMapping.getDefault());
                    }else{                  
                        loggingModel.logWithLabel("Meditation Service API Return from cache", error, tracker.requestID , "ERROR");
                        return client.getCachedDataFor$(key);
                    }
                })                
                .do((data) => {
                    //console.log("set cache ", REDIS_MEDITATION_CACHE);                   
                    client.setex(key, configModule.get('REDIS_CACHE_TIME'), JSON.stringify(data));
                })               
                .map((data) => meditationMapping.transform(data))
                .catch((error) => {                            
                    loggingModel.logWithLabel("Meditation Data Transform Return meditation default", error, tracker.requestID, "ERROR");
                    return Observable.of(meditationMapping.getDefault());
                });
};

meditation.getDefault$ = () =>{
    return Observable.of(meditationMapping.getDefault());
};

meditation.getKeyFor = (key, headers) =>{
    const { authorization } = headers;
    return key + authorization;
};

module.exports = meditation;
