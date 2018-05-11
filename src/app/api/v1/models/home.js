/**
 Provide Api for Home

  GET /api/v1/home
  @header
         Authorization: Bearer {token}
  @optionalQueryParameters
         param1 {String} - description

 Possible HttpStatusCode
    500 - server error
    200 - successfull request


**/


'use strict'

var Observable = require('rxjs/Observable').Observable,
    client = require('../models/client');
require('rxjs/add/observable/of');
require('rxjs/add/operator/map');
require('rxjs/add/observable/forkJoin');
require('rxjs/add/operator/mergeMap');
require('rxjs/add/operator/concatMap');
require('rxjs/add/observable/from');
require('rxjs/add/observable/concat');
require('rxjs/add/operator/catch');
require('rxjs/operator/do');
require('rxjs/Rx');
const userService = require('../services/user');
const userMapping = require('../mappings/user');
const workoutService = require('../services/workout');
const workoutMapping = require('../mappings/workout');
const trackingService = require('../services/tracking');
const activityMapping = require('../mappings/activity');
const meditationService = require('../services/meditation');
const meditationMapping = require('../mappings/meditation');
const favoriteService = require('../services/favorite');
const favoriteMapping = require('../mappings/favorite');
const loggingService = require('../services/logging');
const loggingModel = require('../models/logging');

const REDIS_HOME_CACHE = "alop-adapter-home";
const REDIS_HOME_CACHE_TIME = 1000;


const REDIS_FAV_CACHE = "alop-adapter-favorites";


let home = {
    hasError: false
};

home.getCachedData$ = (key) => {     

     return Observable.create( observer => {        
        client.get(key, (error, result) => {
            if(result){
                console.log("Log it - cache data retrieved ");
                loggingModel.logWithLabel("Cache retrieved for  ", key, "123", "INFO");
                observer.next(JSON.parse(result));
                observer.complete();
            }else {
                console.log("Log it - no cache data to retrieve " , error);
                loggingModel.logWithLabel("Cache data not available for ", key + error, "123", "WARNING");
                observer.error(error);
            }
        });
    });
};


home.get = function(req, res, next){
       var account = {};        
                home.getAccount(req, res)
                .subscribe(
                    (value) => {
                        try{
                            //console.log("data from API directly");
                            account = Object.assign(value, account);
                        }catch(error){
                             let msg = { message: 'Account Subscriber Error Message: ' + error };
                             res.status(500);
                             res.json(msg);
                        }                        
                    },
                    (error) => {                        
                        let msg = { message: 'Subscriber Error Message: ' + error };
                        res.status(500);
                        res.json(msg);
                    },
                    () => {         
                        client.setex(REDIS_HOME_CACHE, REDIS_HOME_CACHE_TIME, JSON.stringify(account));
                        res.status(200);                        
                        res.json(account);
                    }
                );
    }

home.getAccount = function(req, res){

      const f$ = favoriteService.get(req.headers)
                .catch((error) => {
                    console.log("API Error - log it with error ");
                    loggingModel.logWithLabel("Favorite Service API", error, "123");
                    console.log("API Error - get it from cache");
                    return home.getCachedData$(REDIS_FAV_CACHE);
                })                
                .map((data) => {                                            
                    console.log("favorites succeeded and set the favorite cached data");
                    client.setex(REDIS_FAV_CACHE, REDIS_HOME_CACHE_TIME, JSON.stringify(data));
                    return data;
                })         
                .map((data) => favoriteMapping.transform(data))
                .catch((error) => {
                    console.log("favorites error return an empty observable ", error);
                    loggingModel.logWithLabel("Favorite Data Transform", error, "123");
                    return Observable.of({
                        favorites: {}
                    })
                })  
    	const u = userService.get(req.headers)  
                .map((data) => {                    
                    if (data.statusCode && data.statusCode > 400){
                        home.hasError = true;
                        loggingService.logError(data, "User Service API");
                    }
                    return data
                })               
                 .map((data) => ({user: userMapping.transform(data)}))
                 .catch((error) => {
                    home.hasError = true;
                    loggingService.logError(error, "User Service Transform ");
                    return Observable.of({
                        user: {}
                    });
                });

        const wl$ = Observable.of({
                     workoutLabel: "Classes selected for you today: "
                });

        const w = workoutService.get(req.headers)
                    .map((data) => {                       
                        if (!data || data.statusCode > 400){
                            home.hasError = true;
                            loggingService.logError(data, "Workout Service API");
                        }
                        return data;
                    })
                    .map((data) => ({workout: workoutMapping.transform(data)}))
                    .catch((error) => {
                        home.hasError = true;
                        loggingService.logError(error, "Workout Service Transform");
                        return Observable.of({
                            workouts: {}
                        });
                    });

        const a = trackingService.get(req.headers)
            .map((data) => {                       
                        if (!data || data.statusCode > 400){       
                            home.hasError = true;                      
                            loggingService.logError(data, "Tracking Service API");
                        }                                
                        return data
            })
            .map((data) => ({
                activities: activityMapping.transform(data)
            })).catch((error) => {
                home.hasError = true;
                return Observable.of({
                    activities: {}
                })
            });


         
            
        const m$ = meditationService.get(req.headers)
                .do((data) => {              //may want to use a side effect operator like do/tap         
                        if (!data || data.statusCode > 400){            
                            home.hasError = true;                 
                            loggingService.logError(data, "Meditation Service API");
                        }                                
                        return data
                    })
                .map((data) => meditationMapping.transform(data))
                .catch((error) => {
                    home.hasError = true;
                    return Observable.of({
                        favorites: {}
                    })
                }) 

		return Observable.concat(wl$, Observable.forkJoin(f$).concatMap(results => Observable.from(results)));
        //return wl$;
    }

module.exports = home;
