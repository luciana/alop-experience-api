/**
 * Feature API Router
 *
 *
 *
 */

'use strict'

var router = require('express').Router();
const progressService = require('../shared/services/progress');
const trackingService = require('../shared/services/tracking');
const progressMapping = require('../shared/mappings/progress');
const loggingService = require('../shared/services/logging');
const Observable = require('rxjs/Observable').Observable;

router.use((req, res, next) => {
    // access the req.params object
    // make auth checks
    // do logging
    next();
});


router.get('/recommender', (req, res, next) => {
       var recommender = {};
	   
       const a$ = progressService.getAll(req.headers)            
            .map((data) => { 
                        if (!data || data.statusCode > 400){                      
                            loggingService.logError(data, "Progress All Service API");
                            return Observable.of({
                                recommender: {}
                            })
                        }                
                        //console.log("progress service data", data.length);
                        return data;              
            })
            .map((data) => ({
                recommender: progressMapping.transform(data)
            })).catch((error) => {
                console.log("progress service data catch error");
                loggingService.logError(error, "Recommender progress service data catch error");
                return Observable.of({
                    recommender: {}
                })
            });

      
                a$
                .subscribe(
                    (value) => {
                        try{
                            recommender = Object.assign(value, recommender);
                        }catch(error){                            
                             let msg = { message: 'Recommender Progress Subscriber Error Message Assign: ' + error };
                             loggingService.logError(msg, "Recommender Progress Subscriber Error Message: Assign Progress");
                             res.status(500);
                             res.json(msg);
                        }                        
                    },
                    (error) => {                                     
                        let msg = { message: 'Recommender Progress Subscriber Error Message: ' + error };
                         loggingService.logError(msg, "Recommender Progress Subscriber Error Message");
                        res.status(500);
                        res.json(msg);
                    },
                    () => {                               
                        res.status(200);
                        res.json(recommender);
                    }
                );
    });

module.exports = router;