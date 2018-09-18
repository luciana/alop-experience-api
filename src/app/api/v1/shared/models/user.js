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
user.data = {};
user.get$ = (req, res) => {
   
    const key = user.getCacheKey(req.headers);
    const callUserService$ = userService.get(req.headers)
                            //.do((d) => console.log("user service", d))
                            .catch((error)=>{
                                //loggingModel.logWithLabel("User Service Call - Return user default. Calling User Service", error, tracker.requestID, "ERROR");                                    
                                return user.getDefault$;
                            })                          
                            .map((data) => userMapping.transform(data))
                            // .do((data) => {
                            //     //client.setex(key, configModule.get('REDIS_CACHE_TIME'), JSON.stringify(data));
                            // })
                            .catch((error) => {                                  
                                    loggingModel.logWithLabel("User Data Transform - Return user default. Calling User Service", error, tracker.requestID, "ERROR");
                                    return user.getDefault$;
                            });

    return Observable.merge(callUserService$);
    // const cacheIsRetrieved$ = client.getCachedDataFor$(key)
    //                             .filter((value) => value)
    //                             .do((d) => console.log("got data from user caching", d))
    //                             .catch((error) => {                                       
    //                                 loggingModel.logWithLabel("User Data Transform - Return user default. There was data in cache.", error, tracker.requestID, "ERROR");
    //                                 return user.getDefault$;
    //                             });

    // const cacheIsNotRetrieved$ =client.getCachedDataFor$(key)
    //                             .filter((value) => !value)             
    //                              .do((d) => console.log("did not got data from user caching about to call service", d))                    
    //                             .switchMap(() => callUserService$)
    //                             .catch((error) => {                                   
    //                                 loggingModel.logWithLabel("User Data Transform - Return user default. There was not data in cache", error, tracker.requestID, "ERROR");
    //                                 return user.getDefault$;
    //                             });
                               
    // return Observable.merge(cacheIsRetrieved$,cacheIsNotRetrieved$);
};

user.getDefault$ = () =>{
    return Observable.of(userMapping.getDefault());
};

user.getCacheKey = (header) =>{
    const { authorization } = header;
    return REDIS_USER_CACHE + authorization;
};

user.validateToken$ = (req, res)  => {
    const { authorization } = req.headers;

    const e$ = Observable.of(authorization)
               .filter(v => !v);

    const o$ = Observable.of(authorization)
                .filter(v => v)
                .switchMap(() => tokenInfoService.get(req.headers));

    return Observable.merge(e$,o$);
};

module.exports = user;
