var path = require('path');

module.exports = function router(app){
  // routes
    // to db
    // clients? or only user-input GETs and POSTS?

  var teamLoad = {
    teamName: {
      directives: 0
    }
  };

  app.get('/', function index(req, res){
    teamLoad.teamName.directives++
    res.sendFile(__dirname + '/clients/index.html');
    console.log(teamLoad.teamName.directives)
  })
};