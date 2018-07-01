/**
 * Feature API Router
 *
 *
 *
 */

'use strict'

const router = require('express').Router(),
    home = require('./home.model'),
    loggingService = require('../shared/services/logging'),
	loggingModel = require('../shared/models/logging'),
    client = require('../shared/models/client'),
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