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

const router = require('express').Router(),
    home = require('./home.controller'),
    tracker = require('./home.middleware.tracker'),
    validator = require('./home.middleware.validator');

router.use((req, res, next) => {
    // access the req.params object
    // make auth checks
    // do logging
    next();
});

router.get('/home', tracker.trackSession, validator.validate, home.getHomeData);


module.exports = router;