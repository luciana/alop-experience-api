/**
 * Feature API Router
 *
 *
 *
 */

'use strict'

var router = require('express').Router();
const progressService = require('../services/progress');
const trackingService = require('../services/tracking');
const likesMapping = require('../mappings/likes');
const loggingService = require('../services/logging');

router.use((req, res, next) => {
    // access the req.params object
    // make auth checks
    // do logging
    next();
});


router.get('/likes', (req, res, next) => {
       var likes = {};
	   //hasError= false;
       const a = progressService.get(req.headers)
            .do((d) => console.log("DO", d))
            .map((data) => { //may want to use a side-effect operator do/tap
                        if (!data || data.statusCode > 400){
                            //hasError = true;                      
                            loggingService.logError(data, "Progress All Service API");
                        }                
                        console.log("progress service data", data.length);
                        return data
            })
            .map((data) => ({
                likes: likesMapping.transform(data)
            })).catch((error) => {
                //hasError = true;
                return Observable.of({
                    likes: {}
                })
            });

      
                a
                .subscribe(
                    (value) => {
                        try{
                            likes = Object.assign(value, likes);
                        }catch(error){
                            //hasError = true;
                             let msg = { message: 'Progress Subscriber Error Message: ' + error };
                             loggingService.logError(msg, "Progress Subscriber Error Message: Progress");
                             res.status(500);
                             res.json(msg);
                        }                        
                    },
                    (error) => {     
                        //hasError = true;                   
                        let msg = { message: 'Progress Subscriber Error Message: ' + error };
                        res.status(500);
                        res.json(msg);
                    },
                    () => {                               
                        res.status(200);
                        res.json(likes);
                    }
                );
    });

module.exports = router;