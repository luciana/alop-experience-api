/**
 * Feature API Router
 *
 *
 *
 */

'use strict'

var router = require('express').Router(),
    home = require('../models/home');



router.use((req, res, next) => {
    // access the req.params object
    // make auth checks
    // do logging
    next();
});
router.get('/home', home.get);

module.exports = router;