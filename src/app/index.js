'use strict'

let express = require('express'),
    bodyParser = require('body-parser'),
    app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/api/v1', require('./api/v1/home/home.router'));
app.use('/api/v1', require('./api/v1/recommender/likes.router'));
app.use('/api/v1', require('./api/v1/recommender/workouts.router'));

app.use((req, res) => {
	res.status(404).json({message: "Not found"});
});



app.use((err, req, res, next) => {
	res.status(500).json({message: "Dont know what happend error: " + err});
})



module.exports = app;