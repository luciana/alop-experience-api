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
    client = require('../shared/models/client');
var uuid = require('uuid');
require('rxjs/add/observable/of');
require('rxjs/add/operator/map');
require('rxjs/add/observable/forkJoin');
require('rxjs/add/operator/mergeMap');
require('rxjs/add/operator/concatMap');
require('rxjs/add/observable/from');
require('rxjs/add/observable/concat');
require('rxjs/observable/merge');
require('rxjs/add/operator/catch');
require('rxjs/operator/do');
require('rxjs/Rx');
const userService = require('../shared/services/user');
const userMapping = require('../shared/mappings/user');
const workoutService = require('../shared/services/workout');
const workoutMapping = require('../shared/mappings/workout');
const trackingService = require('../shared/services/tracking');
const activityMapping = require('../shared/mappings/activity');
const meditationService = require('../shared/services/meditation');
const meditationMapping = require('../shared/mappings/meditation');
const favoriteService = require('../shared/services/favorite');
const favoriteMapping = require('../shared/mappings/favorite');
const loggingService = require('../shared/services/logging');
const loggingModel = require('../shared/models/logging');
const tokenInfoService = require('../shared/services/tokenInfo');

const REDIS_CACHE_TIME = 100;

const REDIS_HOME_CACHE = "alop-adapter-home";
const REDIS_FAV_CACHE = "alop-adapter-favorites";
const REDIS_USER_CACHE = "alop-adapter-user";
const REDIS_WORKOUT_CACHE = "alop-adapter-workout";
const REDIS_ACTIVITY_CACHE = "alop-adapter-activity";
const REDIS_MEDITATION_CACHE = "alop-adapter-meditation";

let home = {};
home.requestID = 0;

home.validate = (req, res, next) => {
        const { authorization } = req.headers;

        //Given the authorization token is not provided
        //Then go the API
        const e$ = Observable.of(authorization)
                   .filter(v => !v);

        //Given the authorization token is provided and it is valid
        //Then go the API

        //Given the authorization token is provided but it is invalid 
        //Then return 401
        const o$ = Observable.of(authorization)
                    .filter(v => v)
                    .switchMap(() => tokenInfoService.get(req.headers));
  
        Observable.merge(e$,o$).subscribe((v) => {
            if ( !v ){ //token is empty                
                next();
            }else {
                if (v.statusCode === 401){ //token is invalid                      
                    let logEntry = "Unauthorized Request - Invalid Token";
                    let msg = { message: logEntry };
                    loggingModel.logWithLabel(logEntry, error, home.requestID, "ERROR");
                    res.status(401);
                    res.json(msg);
                }else{                    
                    next();
                }
            }                      
        },
        (error) => {                       
            let logEntry = "Error Validating Request token";
            let msg = { message: logEntry };
            loggingModel.logWithLabel(logEntry, error, home.requestID, "ERROR");
            res.status(401);
            res.json(msg);
        },
        ()=> {});
};

home.trackSession = (req, res, next) =>{
     home.requestID = uuid.v1();
     next();
};

home.getHomeData = (req, res, next) => {
        let account = {};
        home.getAccount$(req, res)
        .subscribe(
            (value) => {
                try{    
                    account = Object.assign(value, account);
                }catch(error){
                    let logEntry = "Home Subscriber Value Error Message: ";
                    let msg = { message: logEntry + error };
                    loggingModel.logWithLabel(logEntry, msg, home.requestID, "ERROR");
                    res.status(500);
                    res.json(msg);
                }
            },
            (error) => {
                let logEntry = "Home Subscriber Error Message: ";
                let msg = { message: logEntry + error };
                loggingModel.logWithLabel(logEntry, msg, home.requestID, "ERROR");
                res.status(500);
                res.json(msg);
            },
            () => {
                client.setex(REDIS_HOME_CACHE, REDIS_CACHE_TIME, JSON.stringify(account));
                res.status(200);
                res.json(account);
            }
        );
    };

home.getAccount$ = (req, res) => {
 
    	const u$ = userService.get(req.headers)  
                .catch((error) => {
                    if (error.statusCode === 401){
                        loggingModel.logWithLabel("User Service API 401 Return user default", error, home.requestID , "ERROR");
                        return Observable.of(userMapping.getDefault());
                    }else{
                         loggingModel.logWithLabel("User Service API Return from cache ", error, home.requestID , "ERROR");
                        return client.getCachedDataFor$(REDIS_USER_CACHE);
                    }
                })
                .do((data) => {           
                    client.setex(REDIS_USER_CACHE, REDIS_CACHE_TIME, JSON.stringify(data));
                })                   
                .map((data) => userMapping.transform(data))
                .catch((error) => {                   
                    loggingModel.logWithLabel("User Data Transform - Return user default", error, home.requestID, "ERROR");
                    return Observable.of(userMapping.getDefault());
                });

        const wl$ = Observable.of({
                     workout_label: "Classes selected for you today: "                     
                });
        const b$ = Observable.of({
                     banner_image: "https://s3.amazonaws.com/s3-us-alop-images/men-abs.jpg"                    
                });

        const w$ = workoutService.get(req.headers)
                  .catch((error) => {                                                      
                        loggingModel.logWithLabel("Workout Service API Return from cache", error, home.requestID , "ERROR");                                         
                        return client.getCachedDataFor$(REDIS_WORKOUT_CACHE);                       
                })                
                .do((data) => {                           
                    client.setex(REDIS_WORKOUT_CACHE, REDIS_CACHE_TIME, JSON.stringify(data));                   
                })         
                .map((data) => workoutMapping.transform(data))
                .catch((error) => {                   
                    loggingModel.logWithLabel("Workout Data Transform - Return workout default", error, home.requestID, "ERROR");
                    return Observable.of(workoutMapping.getDefault());
                });

        const a$ = trackingService.get(req.headers)
                .catch((error) => {   
                    if (error.statusCode === 401){   
                        loggingModel.logWithLabel("Activity Service API 401 Return empty default", error, home.requestID , "ERROR");     
                        return Observable.of(activityMapping.getDefault());            
                    }else{
                        loggingModel.logWithLabel("Activity Service API Return from cache", error, home.requestID , "ERROR");
                        return client.getCachedDataFor$(REDIS_ACTIVITY_CACHE);          
                    }
                              
                })                
                .do((data) => {                           
                    client.setex(REDIS_ACTIVITY_CACHE, REDIS_CACHE_TIME, JSON.stringify(data));                  
                })         
                .map((data) => activityMapping.transform(data))
                .catch((error) => {                   
                    loggingModel.logWithLabel("Activity Data Transform Return empty default", error, home.requestID, "ERROR");
                     return Observable.of(activityMapping.getDefault()); 
                });


          const f$ = favoriteService.get(req.headers)
                .catch((error) => {  
                    if (error.statusCode === 401){        
                        loggingModel.logWithLabel("Favorite Service API 401 Return empty default", error, home.requestID , "ERROR");     
                        return Observable.of({
                            favorites: {}
                        })             
                    }else{                 
                        loggingModel.logWithLabel("Favorite Service API Return from cache", error, home.requestID , "ERROR");
                        return client.getCachedDataFor$(REDIS_FAV_CACHE);   
                    }                 
                })                
                .do((data) => {                           
                    client.setex(REDIS_FAV_CACHE, REDIS_CACHE_TIME, JSON.stringify(data));                  
                })         
                .map((data) => favoriteMapping.transform(data))
                .catch((error) => {                   
                    loggingModel.logWithLabel("Favorite Data Transform Return empty default", error, home.requestID, "ERROR");
                    return Observable.of({
                        favorites: {}
                    })
                });

            
        const m$ = meditationService.get(req.headers)
                .catch((error) => {
                    if (error.statusCode === 401){  
                        loggingModel.logWithLabel("Meditation Service API 401 Return meditation default", error, home.requestID , "ERROR");           
                        return Observable.of(meditationMapping.getDefault());            
                    }else{                  
                        loggingModel.logWithLabel("Meditation Service API Return from cache", error, home.requestID , "ERROR");
                        return client.getCachedDataFor$(REDIS_MEDITATION_CACHE);
                    }
                })                
                .do((data) => {                           
                    client.setex(REDIS_MEDITATION_CACHE, REDIS_CACHE_TIME, JSON.stringify(data));
                })               
                .map((data) => meditationMapping.transform(data))
                .catch((error) => {                            
                    loggingModel.logWithLabel("Meditation Data Transform Return meditation default", error, home.requestID, "ERROR");
                    return Observable.of(meditationMapping.getDefault());
                });

		return Observable.concat(m$, 
                                Observable.forkJoin(f$, a$, b$, wl$, w$, u$)
                                .concatMap(results => Observable.from(results))
                                );
    }

module.exports = home;
