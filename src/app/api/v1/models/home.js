/**
 * Feature API Model
 *
 *
 *
 */

'use strict'

var Observable = require('rxjs/Observable').Observable;
require('rxjs/add/observable/of');
require('rxjs/add/operator/map');
require('rxjs/add/observable/forkJoin');
require('rxjs/add/operator/mergeMap');
require('rxjs/add/operator/concatMap');
require('rxjs/add/observable/from');
require('rxjs/add/observable/concat');
require('rxjs/add/operator/catch');
const userService = require('../services/user');
const userMapping = require('../mappings/user');
const workoutService = require('../services/workout');
const workoutMapping = require('../mappings/workout');
const trackingService = require('../services/tracking');
const activityMapping = require('../mappings/activity');
const meditationService = require('../services/meditation');
const meditationMapping = require('../mappings/meditation');
const favoriteService = require('../services/favorite');
const favoriteMapping = require('../mappings/favorite');
const loggingService = require('../services/logging');

class home {
    getAccount(req, res){
    	const u = userService.get(req.headers)  
                .map((data) => {                    
                    if (data.statusCode && data.statusCode > 400){
                        loggingService.logError(data, "User Service API");
                    }
                    return data
                })               
                 .map((data) => ({user: userMapping.transform(data)}))              
                 .catch((error) => {
                    loggingService.logError(error, "User Service Transform ");
                    return Observable.of({
                        user: {}
                    });
                });

        const wl = Observable.of({
                     workoutLabel: "Classes selected for you today: "
                });

        const w = workoutService.get(req.headers)
                    .map((data) => {                       
                        if (!data || data.statusCode > 400){                             
                            loggingService.logError(data, "Workout Service API");
                        }                                
                        return data
                    })
                    .map((data) => ({workout: workoutMapping.transform(data)}))
                    .catch((error) => {
                        loggingService.logError(error, "Workout Service Transform");
                        return Observable.of({
                            workouts: {}
                        });
                    });

        const a = trackingService.get(req.headers)
            .map((data) => {                       
                        if (!data || data.statusCode > 400){                             
                            loggingService.logError(data, "Tracking Service API");
                        }                                
                        return data
            })
            .map((data) => ({
                activities: activityMapping.transform(data)
            })).catch((error) => {
                return Observable.of({
                    activities: {}
                })
            });

        const f = favoriteService.get(req.headers)
            .map((data) => {                       
                        if (!data || data.statusCode > 400){                             
                            loggingService.logError(data, "Favorite Service API");
                        }                                
                        return data
                    })
            .map((data) => ({
                favorites: favoriteMapping.transform(data)
            })).catch((error) => {
                return Observable.of({
                    favorites: {}
                })
            });

        const m = meditationService.get(req.headers)
            .map((data) => {                       
                if (!data || data.statusCode > 400){                             
                    loggingService.logError(data, "Meditation Service API");
                }                                
                return data
                    })
            .map((data) => ({
                    meditation: meditationMapping.transform(data)
                })).catch((error) => {
                    return Observable.of({
                        meditation: {}
                    })
                });

		return Observable.concat(m, Observable.forkJoin(f, a, wl,w,u).concatMap(results => Observable.from(results)));
    }
}
module.exports = new home();
