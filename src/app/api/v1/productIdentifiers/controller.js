/**
 Provide Api for productIdentifiers

  GET /api/v1/productIdentifiers

    Controller for subscribers to support the /productIdentifiers API.


**/


'use strict'

const Observable = require('rxjs/Observable').Observable;
const loggingModel = require('../shared/models/logging'),
    tracker = require('../shared/middleware/tracker'),
    pi = require('./model.js');

let piController = {};

piController.get = (req, res, next) =>{
    let account = {};                    
    pi.getList$()
                .subscribe(
                    (value) => {                    
                        account = Object.assign(value, account);                            
                    },
                    (error) => {                       
                        let logEntry = "Product Identifier Subscriber Error Message: ";                    
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


module.exports = piController;
