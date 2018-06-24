/**
 * Feature API Router
 *
 *
 *
 */

'use strict'

const router = require('express').Router(),
    home = require('../models/home'),
    loggingService = require('../services/logging'),
	loggingModel = require('../models/logging'),
    client = require('../models/client');

router.use((req, res, next) => {
    // access the req.params object
    // make auth checks
    // do logging
    next();
});

router.get('/home', home.getHomeData);


module.exports = router;