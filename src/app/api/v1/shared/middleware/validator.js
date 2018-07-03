/**
 Middleware for /home api calls

 * validates the incoming requests if the token is provided and is valid

**/

const Observable = require('rxjs/Observable').Observable,
        loggingService = require('../services/logging'),
        loggingModel = require('../models/logging'),
        user = require('../models/user'),
        tracker = require('./tracker');

let validator = {};

validator.validate = (req, res, next) => {
        
         user.validateToken$(req, res)
            .subscribe((v) => {
            if ( !v ){ //token is empty                
                next();
            }else {
                if (v.statusCode === 401){ //token is invalid                      
                    let logEntry = "Unauthorized Request - Invalid Token";
                    let msg = { message: logEntry };
                    loggingModel.logWithLabel(logEntry, error, tracker.requestID, "ERROR");
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
            loggingModel.logWithLabel(logEntry, error, tracker.requestID, "ERROR");
            res.status(401);
            res.json(msg);
        },
        ()=> {});
};

module.exports = validator;