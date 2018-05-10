/**
 * Mapping File
 *
 *
 *
 */

'use strict'


class mappings {
    recent_activities(limit, data){         
        let sliced = data.slice(0,limit);
       
        return sliced.map((d) => {
            var result = {};
            result.id = d.id;   
            result.item = d.workout_id;
            result.user = d.user_id;
            return result;
        });
    }

}

class likes {
    transform(data){
        console.log("Adfa", data);
        var result = {};
        var m = new mappings();
        result = m.recent_activities(1,data);
        return result;
    }
}
  

module.exports = new likes();
