var path = require('path');

module.exports = function router(app){
  // routes
    // to db
    // clients? or only user-input GETs and POSTS?

  var teamLoad = {
    liveCount: 0,
    teamName: {
      directives: [],
    }
  };

  app.get('/', function index(req, res){
    teamLoad.liveCount++
    res.sendFile(__dirname + '/clients/index.html');
    console.log(teamLoad.liveCount)
  })
};