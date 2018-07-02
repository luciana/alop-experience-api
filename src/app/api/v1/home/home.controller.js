/**
 Provide Api for Home

  GET /api/v1/home

    Controller for subscribers to support the /home API.


**/


'use strict'

const Observable = require('rxjs/Observable').Observable,
        client = require('../shared/models/client');

const loggingService = require('../shared/services/logging'),
        loggingModel = require('../shared/models/logging'),
        tracker = require('./home.middleware.tracker'),
        home = require('./home.model.js');

const REDIS_CACHE_TIME = 100;
const REDIS_HOME_CACHE = "alop-adapter-home";

let homeController = {};

homeController.getHomeData = (req, res, next) => {
        let account = {};
        home.getAccount$(req, res)
        .subscribe(
            (value) => {
                try{    
                    account = Object.assign(value, account);
                }catch(error){
                    let logEntry = "Home Subscriber Value Error Message: ";
                    let msg = { message: logEntry + error };
                    loggingModel.logWithLabel(logEntry, msg, tracker.requestID, "ERROR");
                    res.status(500);
                    res.json(msg);
                }
            },
            (error) => {
                let logEntry = "Home Subscriber Error Message: ";
                let msg = { message: logEntry + error };
                loggingModel.logWithLabel(logEntry, msg, tracker.requestID, "ERROR");
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



module.exports = homeController;
