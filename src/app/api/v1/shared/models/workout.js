/**
 Provide Api for Home

  GET /api/v1/home
  @header
         Authorization: Bearer {token}
  @optionalQueryParameters
         param1 {String} - description

 Possible HttpStatusCode
    500 - server error
    401 - invalid token
    200 - successfull request


**/


'use strict'
require('rxjs/Rx');
const Observable = require('rxjs/Observable').Observable,
        client = require('../models/client');

const workoutService = require('../services/workout'),
    workoutMapping = require('../mappings/workout'),
    loggingService = require('../services/logging'),
    loggingModel = require('../models/logging'),
    tracker = require('../../home/home.middleware.tracker');

const REDIS_CACHE_TIME = 100;
const REDIS_WORKOUT_CACHE = "alop-adapter-workout";

let workout = {};

workout.get$ = (req, res) => {
    return workoutService.get(req.headers)
                  .catch((error) => {                                                      
                        loggingModel.logWithLabel("Workout Service API Return from cache", error, tracker.requestID , "ERROR");                                         
                        return client.getCachedDataFor$(REDIS_WORKOUT_CACHE);                       
                })                
                .do((data) => {                           
                    client.setex(REDIS_WORKOUT_CACHE, REDIS_CACHE_TIME, JSON.stringify(data));                   
                })         
                .map((data) => workoutMapping.transform(data))
                .catch((error) => {                   
                    loggingModel.logWithLabel("Workout Data Transform - Return workout default", error, tracker.requestID, "ERROR");
                    return Observable.of(workoutMapping.getDefault());
                });
};

workout.getLabel$ = () => {
    return Observable.of({
                 workout_label: "Classes selected for you today: "                     
            });
};


module.exports = workout;
