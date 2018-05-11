/**
 * Logging Model
 *
 *
 *
 */

'use strict'
const loggingService = require('../services/logging');
const logging = {};

logging.logWithLabel = function(label, data, id, level = "ERROR"){
				try{
					//if (!data || data.statusCode > 400){
						loggingService.logError(data, label, id, level);
					//}	
				}catch(e){
					console.log("error while logging an error on ", label + e);
				}
			}

module.exports = logging;