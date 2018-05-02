/**
 * Generic Business API Call methods
 * GET
 *
 *
 */

'use strict'

var request = require('request');
var Observable = require('rxjs/Observable').Observable;
var configModule = require('config');

class apiCall {

	constructor(){
		this.api_token = configModule.get('api_token');
		this.baseUrl = configModule.get('url');
	}	
	parseHeaders(h){	
		if (h['host']){
			delete h['host'];
		}
		h['x-3scale-proxy-secret-token'] = this.api_token;
		h['accept'] = 'application/json';
		h['content-type'] = 'application/json';		
		return h;
	};
	get(options){
		return Observable.create( observer  => {
			request.get(options, (err, resp, body) => {
				var value = body;					
				if (typeof body === 'undefined' || !body){
					value = {"statusCode": 500, 
							 "statusMessage": 'Timeout error - no body returned',
							 "headers": "",
							 "request": options.uri,
							 "error": err};
					console.log("ERROR", value);
				}else if (resp.statusCode > 400){					
					value = {"statusCode": resp.statusCode, 
							 "statusMessage": resp.statusMessage,
							 "headers": resp.headers,
							 "request": resp.request.uri,
							 "error": ""};
					console.log("ERROR", value);
				}
				observer.next(value);
				observer.complete();
				observer.error(err);				
			});
		})
	};

	set(options, input){
		return Observable.create( observer  => {
			request.post(options, (err, resp, body) => {
				observer.next(body);
				observer.complete();
				observer.error(err);
				
			})
		});
	};
};



module.exports = new apiCall();
