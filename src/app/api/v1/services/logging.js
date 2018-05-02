
/**
 * Logging model
 *
 * At minimum, a request must contain:
 * A list with at least one entry
 * An entry should contain following keys: message
 * The whole HTTP body of an API request needs to be less than 1024kb
 *
 * This service uses https://getappenlight.com/page/api/0.5/logs.html APIs, therefore the contract 
 * below must confirm with appenlight
 */

'use strict'

var configModule = require('config'),
	apiCall = require('./apiCall');

let logging = {};
const LOGGING_NAMESPACE = "alop-adapter-home.heroku";


logging.set = function(data, level){
	const input = [{ "log_level": level || "ERROR", //"WARNING" || ERROR || INFO,
						"message": JSON.stringify(data) || "there was a problem but message not extracted",
						"namespace": LOGGING_NAMESPACE, 
						"permanent": false,		
						"server": configModule.host						
						//"tags": [["tag1","value"], ["tag2", 5]]
					}];

	const options = {
		uri: "https://api.appenlight.com/api/logs?protocol_version=0.5&api_key=3b262366edce49a99ebb3d96b40346ee",	
		headers:  {'accept': 'application/json', 'content-type': 'application/json'},
        json: input,
        timeout: 10000
    };
    
	return apiCall.set(options);
};

logging.logError = function(error, label){
	let issue = label + " Error: " + JSON.stringify(error);
    this.set({message: issue}).subscribe((value) =>{
            console.log(label + " Logging Error ", value + " with issue " + issue);
        });
};


module.exports = logging;


