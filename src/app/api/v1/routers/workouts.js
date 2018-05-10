/**
 * Feature API Router
 *
 *
 *
 */

'use strict'

var router = require('express').Router();
const workoutService = require('../services/workout');
const workoutMapping = require('../mappings/workout');
const loggingService = require('../services/logging');

router.use((req, res, next) => {
    // access the req.params object
    // make auth checks
    // do logging
    next();
});


router.get('/workouts', (req, res, next) => {
       var workouts = {};
	   //hasError= false;
       const a = workoutService.getAll(req.headers)
            .map((data) => {
                        if (!data || data.statusCode > 400){
                            //hasError = true;                      
                            loggingService.logError(data, "Workout All Service API");
                        }                       
                        return data
            })
            .map((data) => ({
                workouts: workoutMapping.transformLimited(data)
            })).catch((error) => {
                //hasError = true;
                return Observable.of({
                    workouts: {}
                })
            });

      
                a
                .subscribe(
                    (value) => {
                        try{
                            workouts = Object.assign(value, workouts);
                        }catch(error){
                            //hasError = true;
                             let msg = { message: 'Workout Subscriber Error Message: ' + error };
                             loggingService.logError(msg, "Workout Subscriber Error Message: Workout");
                             res.status(500);
                             res.json(msg);
                        }                        
                    },
                    (error) => {     
                        //hasError = true;                   
                        let msg = { message: 'Workout Subscriber Error Message: ' + error };
                        res.status(500);
                        res.json(msg);
                    },
                    () => {                               
                        res.status(200);
                        res.json(workouts);
                    }
                );
    });

module.exports = router;