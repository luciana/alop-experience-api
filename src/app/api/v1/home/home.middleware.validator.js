/**
 Middleware for /home api calls

 * validates the incoming requests if the token is provided and is valid
 * stores unique request Id to track aa event



**/

const Observable = require('rxjs/Observable').Observable,
        client = require('../shared/models/client'),
        uuid = require('uuid'),
        loggingService = require('../shared/services/logging'),
        loggingModel = require('../shared/models/logging'),
        tokenInfoService = require('../shared/services/tokenInfo'),
        tracker = require('./home.middleware.tracker');
require('rxjs/add/observable/of');

let validator = {};
validator.requestID = 0;

validator.validate = (req, res, next) => {
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