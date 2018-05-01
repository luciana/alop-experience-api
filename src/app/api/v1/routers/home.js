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
const REDIS_HOME_CACHE_TIME = 6;

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
                res.status(200);
                res.json(JSON.parse(result));
            } else {
                home.getAccount(req, res)
                .subscribe(
                    (value) => {
                        try{                           
                            account = Object.assign(value, account);
                        }catch(error){
                             let msg = { message: 'Account Subscriber Error Message: ' + error };
                             res.status(500);
                             res.json(msg);
                        }                        
                    },
                    (error) => {                        
                        let msg = { message: 'Subscriber Error Message: ' + error };
                        res.status(500);
                        res.json(msg);
                    },
                    () => {         
                        client.setex(REDIS_HOME_CACHE, REDIS_HOME_CACHE_TIME, JSON.stringify(account));
                        res.status(200);                        
                        res.json(account);
                    }
                );
            }
        });

    	
});

module.exports = router;