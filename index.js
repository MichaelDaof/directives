var express = require('express');
var mongoose = require('mongoose');
var router = require('./router.js')

var app = express();

mongoose.connect('mongodb://localhost/directives');
router(app);

var port = process.env.PORT || 3000;

app.listen(port)
console.log('Server listening port ' + port)