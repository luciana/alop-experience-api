/**
 Provide Api for Home

    User model - returns observables

**/


'use strict'
require('rxjs/Rx');
const Observable = require('rxjs/Observable').Observable,
        client = require('./client');

const userService = require('../services/user'),
        userMapping = require('../mappings/user'),       
        loggingService = require('../services/logging'),
        loggingModel = require('../models/logging'),
        tracker = require('../../home/home.middleware.tracker'),
        tokenInfoService = require('../services/tokenInfo');

const REDIS_CACHE_TIME = 100;
const REDIS_USER_CACHE = "alop-adapter-user";


let user = {};

user.get$ = (req, res) => {
 
    	return userService.get(req.headers)  
                .catch((error) => {
                    if (error.statusCode === 401){
                        loggingModel.logWithLabel("User Service API 401 Return user default", error, tracker.requestID , "ERROR");
                        return Observable.of(userMapping.getDefault());
                    }else{
                         loggingModel.logWithLabel("User Service API Return from cache ", error, tracker.requestID , "ERROR");
                        return client.getCachedDataFor$(REDIS_USER_CACHE);
                    }
                })
                .do((data) => {           
                    client.setex(REDIS_USER_CACHE, REDIS_CACHE_TIME, JSON.stringify(data));
                })                   
                .map((data) => userMapping.transform(data))
                .catch((error) => {                   
                    loggingModel.logWithLabel("User Data Transform - Return user default", error, tracker.requestID, "ERROR");
                    return Observable.of(userMapping.getDefault());
                });
    }

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
}

module.exports = user;
