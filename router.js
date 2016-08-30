var path = require('path');

module.exports = function router(app){
  // routes
    // to db
    // clients? or only user-input GETs and POSTS?

  // stand in database
  // will be used in future as a cache for users
  var teamLoad = {
    liveCount: 0,
    team: {
      name: 'Blackbriar',
      directives: [],
    }
  };

  app.get('/', function index(req, res){
    teamLoad.liveCount++
    res.sendFile(__dirname + '/clients/index.html');
    console.log(teamLoad.liveCount)
  });

  app.post('/api/commander/add-dir', function (req, res){
    teamLoad.team.directives.push(req.body.dir)
    console.log('POST commander/add-dir: ', teamLoad.team.directives)
    res.end()
  });

  app.get('api/get-all', function (req, res){
    console.log('GET /get-all: ', teamLoad.team.directives)
    res.json(teamLoad.team.directives)
  })
};