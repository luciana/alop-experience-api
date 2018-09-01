/**
 * Mapping File
 *
 *
 *
 */

'use strict'

let progress = {};

progress.transform = (data) => { 
        let sliced = data.slice(0,2);       
        return sliced.map((item) => {
            var result = {};
            result.id = item.id;   
            result.item = item.workout_id;
            result.user = item.user_id;
            return result;
        });
        
};
  

module.exports = progress;
