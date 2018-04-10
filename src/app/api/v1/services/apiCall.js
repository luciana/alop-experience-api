/**
 * Generic Business API Call methods
 * GET
 *
 *
 */

'use strict'

var request = require('request');
var Observable = require('rxjs/Observable').Observable;
//var config = require('../../../../../config/config');
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
	console.log(options);	
		return Observable.create( observer  => {		
			request.get(options, (err, resp, body) => {
				observer.next(body);
				observer.complete();
				observer.error((error) => {
					resp: "error processing response"
					console.log(resp, error);
				})
				
			})
		});
	};
};



module.exports = new apiCall();
