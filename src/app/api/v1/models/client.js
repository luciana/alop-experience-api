
/**
 * Redis client
 *
 *
 *
 */

'use strict'
var redis = require('redis');

var client = redis.createClient();
client.on('error', (err)=>{
	console.log('error creating to redis client' , err);
});

module.exports = client;