var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http)
// server config
var router = require('./router.js');
var bodyParser = require('body-parser');

// TODO: mongoDB for future development
// var mongoose = require('mongoose');
// TODO: mongoDB for future development
// var URI = process.env.MONGODB_URI || 'mongodb://localhost/test'
// mongoose.connect(URI);

app.use('/',  express.static(__dirname + '/'));
app.use(bodyParser.json())
// websocket
// io.on('connection', function(socket){
//   console.log('a user connected: ');
// });
// Don't really understand this pattern, but it seems to work
router(app, io);

var port = process.env.PORT || 3000;

http.listen(port);
console.log('Server listening port ' + port)