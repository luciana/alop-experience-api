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
        client = require('../shared/models/client');

const userService = require('../shared/services/user'),
        userMapping = require('../shared/mappings/user'),
        workoutService = require('../shared/services/workout'),
        workoutMapping = require('../shared/mappings/workout'),
        trackingService = require('../shared/services/tracking'),
        activityMapping = require('../shared/mappings/activity'),
        meditationService = require('../shared/services/meditation'),
        meditationMapping = require('../shared/mappings/meditation'),
        favoriteService = require('../shared/services/favorite'),
        favoriteMapping = require('../shared/mappings/favorite'),
        loggingService = require('../shared/services/logging'),
        loggingModel = require('../shared/models/logging'),
        tracker = require('./home.middleware.tracker'),
        tokenInfoService = require('../shared/services/tokenInfo'),
        user = require('../shared/models/user'),
        workout = require('../shared/models/workout');


// require('rxjs/add/observable/of');
// require('rxjs/add/operator/map');
// require('rxjs/add/observable/forkJoin');
// require('rxjs/add/operator/concatMap');
// require('rxjs/add/observable/from');
// require('rxjs/add/observable/concat');
// require('rxjs/observable/merge');
// require('rxjs/add/operator/catch');
// require('rxjs/operator/do');


const REDIS_CACHE_TIME = 100;
const REDIS_FAV_CACHE = "alop-adapter-favorites";
const REDIS_ACTIVITY_CACHE = "alop-adapter-activity";
const REDIS_MEDITATION_CACHE = "alop-adapter-meditation";

let home = {};

home.getAccount$ = (req, res) => {
 
    	const u$ = user.get$(req, res);

        const wl$ = workout.getLabel$();

        const b$ = Observable.of({
                     banner_image: "https://s3.amazonaws.com/s3-us-alop-images/men-abs.jpg"                    
                });

        const w$ = workout.get$(req, res);

        const a$ = trackingService.get(req.headers)
                .catch((error) => {   
                    if (error.statusCode === 401){   
                        loggingModel.logWithLabel("Activity Service API 401 Return empty default", error, tracker.requestID , "ERROR");     
                        return Observable.of(activityMapping.getDefault());            
                    }else{
                        loggingModel.logWithLabel("Activity Service API Return from cache", error, tracker.requestID , "ERROR");
                        return client.getCachedDataFor$(REDIS_ACTIVITY_CACHE);          
                    }
                              
                })                
                .do((data) => {                           
                    client.setex(REDIS_ACTIVITY_CACHE, REDIS_CACHE_TIME, JSON.stringify(data));                  
                })         
                .map((data) => activityMapping.transform(data))
                .catch((error) => {                   
                    loggingModel.logWithLabel("Activity Data Transform Return empty default", error, tracker.requestID, "ERROR");
                     return Observable.of(activityMapping.getDefault()); 
                });


          const f$ = favoriteService.get(req.headers)
                .catch((error) => {  
                    if (error.statusCode === 401){        
                        loggingModel.logWithLabel("Favorite Service API 401 Return empty default", error, tracker.requestID , "ERROR");     
                        return Observable.of({
                            favorites: {}
                        })             
                    }else{                 
                        loggingModel.logWithLabel("Favorite Service API Return from cache", error, tracker.requestID , "ERROR");
                        return client.getCachedDataFor$(REDIS_FAV_CACHE);   
                    }                 
                })                
                .do((data) => {                           
                    client.setex(REDIS_FAV_CACHE, REDIS_CACHE_TIME, JSON.stringify(data));                  
                })         
                .map((data) => favoriteMapping.transform(data))
                .catch((error) => {                   
                    loggingModel.logWithLabel("Favorite Data Transform Return empty default", error, tracker.requestID, "ERROR");
                    return Observable.of({
                        favorites: {}
                    })
                });

            
        const m$ = meditationService.get(req.headers)
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

		return Observable.concat(m$, 
                                Observable.forkJoin(f$, a$, b$, wl$, w$, u$)
                                .concatMap(results => Observable.from(results))
                                );
    }


module.exports = home;
