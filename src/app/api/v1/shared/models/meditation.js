/**
 Provide Api for Home

    User model - returns observables

**/


'use strict'
require('rxjs/Rx');
const Observable = require('rxjs/Observable').Observable,
        client = require('./client');

const meditationService = require('../services/meditation'),
        meditationMapping = require('../mappings/meditation'),
        loggingService = require('../services/logging'),
        loggingModel = require('../models/logging'),
        tracker = require('../middleware/tracker');

const REDIS_CACHE_TIME = 100;
const REDIS_MEDITATION_CACHE = "alop-adapter-meditation";

let meditation = {};

meditation.get$ = (req, res) => {
 
    	return meditationService.get(req.headers)
                .catch((error) => {
                    if (error.statusCode === 401){  
                        loggingModel.logWithLabel("Meditation Service API 401 Return meditation default", error, tracker.requestID , "ERROR");           
                        return Observable.of(meditationMapping.getDefault());            
                    }else{                  
                        loggingModel.logWithLabel("Meditation Service API Return from cache", error, tracker.requestID , "ERROR");
                        return client.getCachedDataFor$(REDIS_MEDITATION_CACHE);
                    }
                })                
                .do((data) => {                           
                    client.setex(REDIS_MEDITATION_CACHE, REDIS_CACHE_TIME, JSON.stringify(data));
                })               
                .map((data) => meditationMapping.transform(data))
                .catch((error) => {                            
                    loggingModel.logWithLabel("Meditation Data Transform Return meditation default", error, tracker.requestID, "ERROR");
                    return Observable.of(meditationMapping.getDefault());
                });
};

module.exports = meditation;
