/**
 Middleware for /home api calls

 * validates the incoming requests if the token is provided and is valid
 * stores unique request Id to track aa event



**/

const uuid = require('uuid');

let tracker = {};
tracker.requestID = 0;

tracker.trackSession = (req, res, next) =>{
     tracker.requestID = uuid.v1();
     next();
};

module.exports = tracker;