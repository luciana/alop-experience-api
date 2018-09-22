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
		this.api_token = "MPP-Allow-API-Call";
		this.baseUrl = configModule.get('url');
	}	
	parseHeaders(h){			
		if (h['host']){
			delete h['host'];
		}
		h['x-3scale-proxy-secret-token'] = this.api_token;
		h['accept'] = 'application/json';
		h['content-type'] = 'application/json';	
		if( h['Accept-Encoding']){
			delete h['Accept-Encoding'];
		}

		console.log('api call header', h);
		return h;
	};
	get(options){
		return Observable.create( observer  => {
			request.get(options, (err, resp, body) => {
				if (typeof body === 'undefined' || !body){
						let errorValue = {"statusCode": 500, 
							 "statusMessage": 'Timeout error - no body returned',
							 "headers": "",
							 "request": options.uri,
							 "error": ""};
						observer.error(errorValue);
				} else if(resp.statusCode === 200) {					
					observer.next( body );
					observer.complete();
				} else {
					let errorValue = err;
					if (resp.statusCode > 400){					
						errorValue = {"statusCode": resp.statusCode, 
								 "statusMessage": resp.statusMessage + " and error ",
								 "headers": resp.headers,
								 "request": resp.request.uri,
								 "error": errorValue};					
					}
					observer.error(errorValue);
				}	
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
