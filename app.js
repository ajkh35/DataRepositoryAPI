var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var port = process.env.port || 3000;
var mongoose = require('mongoose');
var morgan = require('morgan');
var router = require('./routes/router');
var app = express();

mongoose.connect('mongodb://localhost/test');

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(morgan('combined'));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine','ejs');

app.use(router);

app.listen(port);
console.log('Listening on port '+port);