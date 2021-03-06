/**
 * Logging Model
 *
 *
 *
 */

'use strict'
const loggingService = require('../services/logging'),
		configModule = require('config');
const logging = {};

logging.logWithLabel = function(label, data, id, level){
				try{
					let logEntry = label + " for:" + id +" " + level +": " + JSON.stringify(data);											
					console.log("Experince API Logging - ", logEntry);
					if (configModule.get('logging')){
						loggingService.logError(logEntry, label, id, level);
					}
				}catch(e){
					let logEntry = label + " for:" + id + " " + level +": " + e;
					console.log("Experince API Logging catch exception ", logEntry);
				}
			}

module.exports = logging;