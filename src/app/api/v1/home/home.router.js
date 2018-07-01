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
    client = require('../shared/models/client');

router.use((req, res, next) => {
    // access the req.params object
    // make auth checks
    // do logging
    next();
});

router.get('/home', home.validate, home.trackSession, home.getHomeData);


module.exports = router;