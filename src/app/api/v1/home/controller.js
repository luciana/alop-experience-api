/**
 Provide Api for Home

  GET /api/v1/home

    Controller for subscribers to support the /home API.


**/


'use strict'

const Observable = require('rxjs/Observable').Observable;

const loggingService = require('../shared/services/logging'),
        loggingModel = require('../shared/models/logging'),
        tracker = require('../shared/middleware/tracker'),
        user = require('../shared/models/user'),
        home = require('./model.js');

let homeController = {};

homeController.get = (req, res, next) =>{
     let account = {};
    const validate$ = user.validateToken$(req, res);

    const defaultAccount$ = validate$                                
                            .filter(value => !value)                                
                            .switchMap(()=>  home.defaultAccount$());
                    
    const homeAccount$ = validate$                 
                        .filter(value => value)                       
                        .switchMap(()=>  home.getAccount$(req, res));

    Observable.merge(defaultAccount$,homeAccount$)
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
                        let status = 500;
                        if(error.statusCode && error.statusCode === 401){
                            status = 401;
                            logEntry = "Unauthorized access - 401 for Token Validation";
                        }                        
                        let msg = { message: logEntry + error };
                        loggingModel.logWithLabel(logEntry, msg, tracker.requestID, "ERROR");
                        res.status(status);
                        res.json(msg);
                    },
                    () => {                                       
                        res.status(200);
                        res.json(account);
                    }
                );
};

module.exports = homeController;
