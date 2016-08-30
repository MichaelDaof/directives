var path = require('path');

module.exports = function router(app){
  // routes
    // to db
    // clients? or only user-input GETs and POSTS?

  app.get('/', function index(req, res){
    res.sendFile(__dirname + '/clients/index.html')
  })
};