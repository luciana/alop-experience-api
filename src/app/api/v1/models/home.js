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

const REDIS_HOME_CACHE = "alop-adapter-home";
const REDIS_HOME_CACHE_TIME = 6;

let home = {
    hasError: false
};

home.get = function(req, res, next){
       var account = {};
        client.get(REDIS_HOME_CACHE, (error, result) => {
            if(result && !home.hasError){
                console.log("data from caching");
                res.status(200);
                res.json(JSON.parse(result));
            } else {
                console.log("data from API directly");
                home.getAccount(req, res)
                .subscribe(
                    (value) => {
                        try{
                            account = Object.assign(value, account);
                        }catch(error){
                            home.hasError = true;
                             let msg = { message: 'Account Subscriber Error Message: ' + error };
                             res.status(500);
                             res.json(msg);
                        }                        
                    },
                    (error) => {     
                        home.hasError = true;                   
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
        });
    }

home.getAccount = function(req, res){
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

        const wl = Observable.of({
                     workoutLabel: "Classes selected for you today: "
                });

        const w = workoutService.get(req.headers)
                    .map((data) => {                       
                        if (!data || data.statusCode > 400){                    
                            home.hasError = true;
                            loggingService.logError(data, "Workout Service API");
                        }                                
                        return data
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

        const f = favoriteService.get(req.headers)
            .map((data) => {                       
                        if (!data || data.statusCode > 400){            
                            home.hasError = true;                 
                            loggingService.logError(data, "Favorite Service API");
                        }                                
                        return data
                    })
            .map((data) => ({
                favorites: favoriteMapping.transform(data)
            })).catch((error) => {
                home.hasError = true;
                return Observable.of({
                    favorites: {}
                })
            });

        const m = meditationService.get(req.headers)
            .map((data) => {                       
                if (!data || data.statusCode > 400){
                    home.hasError = true;                 
                    loggingService.logError(data, "Meditation Service API");
                }                                
                return data
                    })
            .map((data) => ({
                    meditation: meditationMapping.transform(data)
                })).catch((error) => {
                    home.hasError = true;
                    return Observable.of({
                        meditation: {}
                    })
                });

		return Observable.concat(wl, Observable.forkJoin(m).concatMap(results => Observable.from(results)));
    }

module.exports = home;
