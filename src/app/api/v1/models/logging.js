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
					let logEntry = label + " " + level +": " + JSON.stringify(data);
					console.log("Experince API Logging with Label ", logEntry);
					if (configModule.get('logging')){
						loggingService.logError(data, label, id, level);
					}
				}catch(e){
					let logEntry = label + " " + level +": " + e;
					console.log("Experince API Logging with Label catch exception ", logEntry);
				}
			}

module.exports = logging;