/**
 Provide Api for Home

  GET /api/v1/home
  @header
         Authorization: Bearer {token}
  @optionalQueryParameters
         param1 {String} - description

 Possible HttpStatusCode
    500 - server error
    401 - invalid token
    200 - successfull request


**/


'use strict'
require('rxjs/Rx');
const Observable = require('rxjs/Observable').Observable,
        client = require('../shared/models/client');

const   loggingService = require('../shared/services/logging'),
        loggingModel = require('../shared/models/logging'),
        tracker = require('./home.middleware.tracker'),    
        user = require('../shared/models/user'),
        workout = require('../shared/models/workout'),
        meditation = require('../shared/models/meditation');

let home = {};

home.getAccount$ = (req, res) => {
    	const u$ = user.get$(req, res);
        const wl$ = workout.getLabel$();
        const b$ = Observable.of({
                     banner_image: "https://s3.amazonaws.com/s3-us-alop-images/men-abs.jpg"                    
                });
        const w$ = workout.get$(req, res);
        const a$ = workout.getActivities$(req, res);
        const f$ =  workout.getFavorites$(req, res);
        const m$ = meditation.get$(req,res);

		return Observable.concat(m$, 
                                Observable.forkJoin(f$, a$, b$, wl$, w$, u$)
                                .concatMap(results => Observable.from(results))
                                );
    }


module.exports = home;
