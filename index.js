var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http)
// server config
var router = require('./router.js');
var bodyParser = require('body-parser');

app.use('/', express.static(__dirname + '/'));
app.use(bodyParser.json())
router(app, io);
console.log("three)")

var port = process.env.PORT || 3000;

http.listen(port);
console.log('Server listening port ' + port)
