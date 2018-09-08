/**
 * Feature API Router
 *
 *
 *
 */

'use strict'

var router = require('express').Router();
const Observable = require('rxjs/Observable').Observable;
const scheduleMapping = require('../shared/mappings/schedule');
const SCHEDULE_MAX = 25;

router.use((req, res, next) => {
    // access the req.params object
    // make auth checks
    // do logging
    next();
});


router.get('/schedule', (req, res, next) => {
	let schedule = scheduleMapping.getDefault();
	res.status(200);
	res.json(schedule);
});

router.get('/schedule/:id', (req, res, next) => {
	let id = req.params.id;
	if ((!id) || (!id.match(/^([1-9]|10)$/)) || (id > SCHEDULE_MAX)) {
		id = Math.floor(Math.random() * Math.floor(SCHEDULE_MAX+1));
	}
	let schedule = scheduleMapping.getById(id);
	res.status(200);
	res.json(schedule);
});

module.exports = router;