/**
 Provide Api for Home

  GET /api/v1/home

    Controller for subscribers to support the /home API.


**/


'use strict'

const Observable = require('rxjs/Observable').Observable,
        client = require('../shared/models/client'),
        configModule = require('config');

const loggingService = require('../shared/services/logging'),
        loggingModel = require('../shared/models/logging'),
        tracker = require('../shared/middleware/tracker'),
        user = require('../shared/models/user'),
        home = require('./model.js');

var REDIS_CACHE_TIME = configModule.get('REDIS_CACHE_TIME');
const REDIS_HOME_CACHE = "alop-adapter-home";

let homeController = {};



homeController.get = (req, res, next) =>{
     let account = {};
          user.validateToken$(req, res)
            .subscribe((v) => {
                if ( !v ){ //token is empty                     
                    homeController.getDefaultHomeData(req, res, next);
                }else {
                    if (v.statusCode === 401){ //token is invalid                      
                        let logEntry = "Unauthorized Request - Invalid Token";
                        let msg = { message: logEntry };
                        loggingModel.logWithLabel(logEntry, error, tracker.requestID, "ERROR");
                        res.status(401);
                        res.json(msg);
                    }else{                      
                        homeController.getHomeData(req, res, next);
                    }
                }                      
        },
        (error) => {                       
            let logEntry = "Error Validating Request token";
            let msg = { message: logEntry };
            loggingModel.logWithLabel(logEntry, error, tracker.requestID, "ERROR");
            res.status(401);
            res.json(msg);
        },
        ()=> {});
};

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

homeController.getDefaultHomeData = (req, res, next) => {

    let account = {};
    home.defaultAccount$()
    .subscribe(
            (value) => {
                try{                  
                    account = Object.assign(value, account);
                }catch(error){
                    let logEntry = "Home Default Subscriber Value Error Message: ";
                    let msg = { message: logEntry + error };
                    loggingModel.logWithLabel(logEntry, msg, tracker.requestID, "ERROR");
                    res.status(500);
                    res.json(msg);
                }
            },
            (error) => {
                let logEntry = "Home Default Subscriber Error Message: ";
                let msg = { message: logEntry + error };
                loggingModel.logWithLabel(logEntry, msg, tracker.requestID, "ERROR");
                res.status(500);
                res.json(msg);
            },
            () => {              
                res.status(200);
                res.json(account);
            }
        );
};

module.exports = homeController;
