var redis = require('redis');
var configModule = require('config');

var redisClient = (function(){
	
	var client = {
		get: function (key, cb){
			cb(null, null);
		},
		setex: function (key, time, value){
			//do nothing 
		}
	};

	var connectionString = configModule.get('REDISTOGO_URL');
	var c = redis.createClient(connectionString, {
		retry_strategy: function(options){
			if(options.error_code === 'ECONNREFUSED'){
				return;
			}
		}
	});

	c.on('ready', function(){
		client = c;
	});

	var getClient = function(){
		return client;
	};
	return {
		getClient: getClient
	}
})();

module.exports = redisClient;