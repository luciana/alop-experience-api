
/**
 * Redis client
 *
 *
 *
 */

'use strict'
var redis = require('redis');

if (process.env.REDISTOGO_URL){
	var rtg   = require("url").parse(process.env.REDISTOGO_URL);
	var client = redis.createClient(rtg.port, rtg.hostname);
	client.auth(rtg.auth.split(":")[1]);
}else{
	var client = redis.createClient();
}

client.on('error', (err)=>{
	console.log('error creating to redis client' , err);
});

module.exports = client;