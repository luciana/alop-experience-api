/**
 Provide Api for Home

    User model - returns observables

**/


'use strict'
require('rxjs/Rx');
const Observable = require('rxjs/Observable').Observable,
        client = require('./client'),
        configModule = require('config');

const userService = require('../services/user'),
        userMapping = require('../mappings/user'),       
        loggingService = require('../services/logging'),
        loggingModel = require('../models/logging'),
        tracker = require('../middleware/tracker'),
        tokenInfoService = require('../services/tokenInfo');


const REDIS_USER_CACHE = "alop-adapter-user";


let user = {};

user.get$ = (req, res) => {

        const callUserService$ = userService.get(req.headers)
                            .catch((error)=>{
                                return Observable.of(userMapping.getDefault());
                            })
                            .do((data)=> { console.log("callUserservice data", data)})
                            .map((data) => userMapping.transform(data))
                            .do((data) => {
                                console.log("set cache ", REDIS_USER_CACHE);
                                client.setex(REDIS_USER_CACHE, configModule.get('REDIS_CACHE_TIME'), JSON.stringify(data));
                            })
                            .catch((error) => {
                                    console.log("service error", error);
                                   // loggingModel.logWithLabel("User Data Transform - Return user default", error, tracker.requestID, "ERROR");
                                    return Observable.of(userMapping.getDefault());
                            });


    const cacheIsRetrieved$ = client.getCachedDataFor$(REDIS_USER_CACHE)
                                //.do((data)=> { console.log("cacheIsRetrieved data", data)})
                                .filter((value) => value)
                                .do((data)=> { console.log("there was data in the cache")})
                                .catch((error) => {    
                                    console.log("cache retrieve error", error);
                                   // loggingModel.logWithLabel("User Data Transform - Return user default", error, tracker.requestID, "ERROR");
                                    return Observable.of(userMapping.getDefault());
                                })                               


                          

    const cacheIsNotRetrieved$ =client.getCachedDataFor$(REDIS_USER_CACHE)
                                //.do((data)=> { console.log("cacheIsNotRetrieved data", data)})
                                .filter((value) => !value)
                                .do((data)=> { console.log("there wasn't data in the cache")})
                                .switchMap(() => callUserService$)
                                .catch((error) => {
                                    console.log("service call error", error);
                                   // loggingModel.logWithLabel("User Data Transform - Return user default", error, tracker.requestID, "ERROR");
                                    return Observable.of(userMapping.getDefault());
                                });
                               

    return Observable.merge(cacheIsRetrieved$,cacheIsNotRetrieved$);

 
    // return client.getCachedDataFor$(REDIS_USER_CACHE)
    //             .catch((error) => {                    
    //                 return userService.get(req.headers)
    //                 .catch((error) => {
    //                     if (error.statusCode === 401){
    //                         loggingModel.logWithLabel("User Service API 401 Return user default", error, tracker.requestID , "ERROR");
    //                         return Observable.of(userMapping.getDefault());
    //                     }else{
    //                         loggingModel.logWithLabel("User Service API Return from default ", error, tracker.requestID , "ERROR");
    //                         return Observable.of(userMapping.getDefault());
    //                     }
    //                 })
    //             })
    //             .do((d) => {
    //                 console.log("cash data available", d);
    //             })
    //             .map((data) => userMapping.transform(data))
    //             .catch((error) => {                   
    //                 loggingModel.logWithLabel("User Data Transform - Return user default", error, tracker.requestID, "ERROR");
    //                 return Observable.of(userMapping.getDefault());
    //             });
             

    	// return userService.get(req.headers)  
     //            .catch((error) => {
     //                if (error.statusCode === 401){
     //                    loggingModel.logWithLabel("User Service API 401 Return user default", error, tracker.requestID , "ERROR");
     //                    return Observable.of(userMapping.getDefault());
     //                }else{
     //                     loggingModel.logWithLabel("User Service API Return from cache ", error, tracker.requestID , "ERROR");
     //                    return client.getCachedDataFor$(REDIS_USER_CACHE);
     //                }
     //            })
     //            .do((data) => {
     //                console.log("set cache ", REDIS_USER_CACHE);
     //                client.setex(REDIS_USER_CACHE, configModule.get('REDIS_CACHE_TIME'), JSON.stringify(data));
     //            })                   
     //            .map((data) => userMapping.transform(data))
     //            .catch((error) => {                   
     //                loggingModel.logWithLabel("User Data Transform - Return user default", error, tracker.requestID, "ERROR");
     //                return Observable.of(userMapping.getDefault());
     //            });
    }

user.getDefault$ = () =>{
    return Observable.of(userMapping.getDefault());
};

user.validateToken$ = (req, res)  => {

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
                    .switchMap(() => tokenInfoService.get(req.headers))
                    .catch((error) => {                            
                        loggingModel.logWithLabel("Token Validation Service", error, tracker.requestID, "ERROR");               
                    });

       
  
        return Observable.merge(e$,o$);
};

module.exports = user;
