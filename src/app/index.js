'use strict'

let express = require('express'),
    bodyParser = require('body-parser'),
    app = express(),
    compression = require('compression');

app.use(compression());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});


app.use('/api/v1', require('./api/v1/home/router'));
app.use('/api/v1', require('./api/v1/recommender/router'));
app.use('/api/v1', require('./api/v1/recommender/workouts.router'));
app.use('/api/v1', require('./api/v1/schedule/router'));

app.use((req, res) => {
	res.status(404).json({message: "Not found"});
});



app.use((err, req, res, next) => {
	res.status(500).json({message: "Dont know what happend error: " + err});
})



module.exports = app;