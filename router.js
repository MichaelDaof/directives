var path = require('path');

module.exports = function router(app, io){
  // routes
    // to db
    // clients? or only user-input GETs and POSTS?


  // stand in for database
  // will be used in future as a cache for users along side DB
  var teamLoad = {
    liveCount: 0, // utility counter to test memory persistence 
    team: {
      name: 'Blackbriar',
      directives: {},
      agents: {}
    }
  };

  io.on('connection', function(socket){
    console.log('a user connected: ');
    // need to fix client before emitting on connection
    io.emit('directivesState', teamLoad.team.directives);

    socket.on('addDirective', function (data){
      teamLoad.team.directives[data] = data
      console.log('addDirective router ', teamLoad.team.directives)
      io.emit('directivesState', teamLoad.team.directives)
    });
    socket.on('claimDirective', function (key){
      console.log('claimDirective router key: ', key)
      delete teamLoad.team.directives[key];
      io.emit('directivesState', teamLoad.team.directives);
      console.log('claimDirective router state: ', teamLoad.team.directives)
    });
    socket.on('getAgents', function (){
      console.log('getAgents')
      socket.emit('sendAgents', teamLoad.team.agents)
    })
    socket.on('newAgent', function (agent){
      teamLoad.team.agents[agent.name] = agent;
      io.emit('sendAgents', teamLoad.team.agents);
      console.log('newAgent received: ', agent, "\nagents\n", teamLoad.team.agents )
    })

  });

  // io.on('updateDirectives', function (client){

  // })


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
};