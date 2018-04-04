/**
 * Mapping File
 *
 *
 *
 */

'use strict'


class meditation {
    transform(data){
        var result = {};
        result.id = data.id;
        result.title = data.title;
        result.duration = data.duration;
        result.path = data.path;
        return result;
    }
}

module.exports = new meditation();
