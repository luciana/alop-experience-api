/**
 * Feature API Router
 *
 *
 *
 */

'use strict'

var router = require('express').Router();
const pi = require('./controller'),
	 tracker = require('../shared/middleware/tracker');


router.use((req, res, next) => {
    // access the req.params object
    // make auth checks
    // do logging
    next();
});

router.get('/productIdentifiers', tracker.trackSession, pi.get);

module.exports = router;