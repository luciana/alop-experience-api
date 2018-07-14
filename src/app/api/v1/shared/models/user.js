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
                            .map((data) => userMapping.transform(data))
                            .do((data) => {
                                client.setex(REDIS_USER_CACHE, configModule.get('REDIS_CACHE_TIME'), JSON.stringify(data));
                            })
                            .catch((error) => {                                  
                                    loggingModel.logWithLabel("User Data Transform - Return user default. Calling User Service", error, tracker.requestID, "ERROR");
                                    return Observable.of(userMapping.getDefault());
                            });

    const cacheIsRetrieved$ = client.getCachedDataFor$(REDIS_USER_CACHE)                               
                                .filter((value) => value)
                                .catch((error) => {                                       
                                    loggingModel.logWithLabel("User Data Transform - Return user default. There was data in cache.", error, tracker.requestID, "ERROR");
                                    return Observable.of(userMapping.getDefault());
                                });

    const cacheIsNotRetrieved$ =client.getCachedDataFor$(REDIS_USER_CACHE)                                
                                .filter((value) => !value)                               
                                .switchMap(() => callUserService$)
                                .catch((error) => {                                   
                                    loggingModel.logWithLabel("User Data Transform - Return user default. There was not data in cache", error, tracker.requestID, "ERROR");
                                    return Observable.of(userMapping.getDefault());
                                });
                               
    return Observable.merge(cacheIsRetrieved$,cacheIsNotRetrieved$);
};

user.getDefault$ = () =>{
    return Observable.of(userMapping.getDefault());
};

user.validateToken$ = (req, res)  => {
    const { authorization } = req.headers;
    if ( !authorization ){           
        return Observable.of(authorization);
    }else{           
        return tokenInfoService.get(req.headers)
                .catch((error) => {
                    loggingModel.logWithLabel("Token Validation Service", error, tracker.requestID, "ERROR");
                });
    }
};

module.exports = user;
