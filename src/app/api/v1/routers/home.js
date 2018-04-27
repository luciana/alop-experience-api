/**
 * Feature API Router
 *
 *
 *
 */

'use strict'

var router = require('express').Router(),
    home = require('../models/home'),
    client = require('../models/client');

const REDIS_HOME_CACHE = "alop-adapter-home";

router.use((req, res, next) => {
    // access the req.params object
    // make auth checks
    // do logging
    next();
});
router.get('/home', (req, res, next) => {
	   var account = {};
        client.get(REDIS_HOME_CACHE, (error, result) => {
            if(result){
                console.log("collected data from redis cache");
                res.status(200);
                res.json(JSON.parse(result));
            } else {
                console.log("collected data from api directly");
                home.getAccount(req, res)
                .subscribe(
                    (value) => {            
                        account = Object.assign(value, account);
                    },
                    (error) => {
                        res.status(500);
                        res.json({ message: 'Error Message: ' + error });
                    },
                    () => {         
                        client.setex(REDIS_HOME_CACHE, 600, JSON.stringify(account));
                        res.status(200);                        
                        res.json(account);
                    }
                );
                }

        });

    	
});

module.exports = router;