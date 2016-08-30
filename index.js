var express = require('express');
var mongoose = require('mongoose');
var router = require('./router.js');


var app = express();

app.use('/',  express.static(__dirname + '/'));

// TODO: Prep DB 
// var URI = process.env.MONGODB_URI || 'mongodb://localhost/test'
// mongoose.connect(URI);

// Don't really understand this pattern, but it seems to work
router(app);

var port = process.env.PORT || 3000;

app.listen(port);
console.log('Server listening port ' + port)