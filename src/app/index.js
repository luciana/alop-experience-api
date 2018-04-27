'use strict'

let express = require('express'),
    bodyParser = require('body-parser'),
    app = express(),
    logger = require('morgan');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/api/v1', require('./api/v1/routers/home'));

app.use(logger('combined'));
app.use(function(req, res, next){
	const error = new Error('Dont know what happend error');
	error.status = 500;
	next(error);
})
app.use(function(err, req, res, next){

if (req.app.get('env') !== 'development') {
        delete err.stack;
    }
    res.status(err.statusCode || 500).json(err);
});

module.exports = app;