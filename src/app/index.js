'use strict'

let express = require('express'),
    bodyParser = require('body-parser'),
    app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/api/v1', require('./api/v1/routers/home'));


app.use(function(err, req, res, next){
	console.log("middleware error throw", err);
	//const error = new Error('Dont know what happend error');
	//error.status = 500;
	//next(error);
	res.status(500).json({message: "Dont know what happend error"});
})

module.exports = app;