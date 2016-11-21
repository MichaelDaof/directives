var path = require('path');
var teamHandler = require('./server/handlers/teamHandler')

module.exports = function router(app, io){

  // stand in for database
  // will be used in future as a cache for active teams along side DB
  // consider Redis
  var teamLoad = {
    liveCount: 0, // dev: utility counter to monitor cache activity
    team: {
      name: 'Blackbriar',
      directives: {},
      agents: {}
    }
  };


  // TODO: build websocket connection tracker
  // TODO: discover better modularity
  io.on('connection', function(socket){
    console.log('a user connected: ', socket.id);
    // Update all on every new connect
    io.emit('directivesState', teamLoad.team.directives);
    socket.on('refresh', function (){
      console.log("Refreshing")
      socket.emit('directivesState', teamLoad.team.directives)
    })
    // For commander client to add to to team-view
    socket.on('addDirective', function (data){
      teamLoad.team.directives[data] = data
      console.log('addDirective router ', teamLoad.team.directives)
      io.emit('directivesState', teamLoad.team.directives)
      console.log(teamLoad)
    });
    // For agent client to claim from team-view
    socket.on('claimDirective', function (key){
      console.log('claimDirective router key: ', key)
      delete teamLoad.team.directives[key];
      io.emit('directivesState', teamLoad.team.directives);
      console.log('claimDirective router state: ', teamLoad.team.directives)
    });
    // For commander client to get all agents
    socket.on('getAgents', function (){
      socket.emit('sendAgents', teamLoad.team.agents)
    });
    // For commander client to get new agent signin
    socket.on('newAgent', function (agent){
      teamLoad.team.agents[agent.name] = agent;
      io.emit('sendAgents', teamLoad.team.agents);
      console.log('newAgent received: ', agent, "\nagents\n", teamLoad.team.agents )
    });
    // team listen for update agent status
    socket.on('agentUpdate', function (agent){
      teamLoad.team.agents[agent.name].status = agent.status;
      teamLoad.team.agents[agent.name].directive = agent.directive;
      io.emit('sendAgents', teamLoad.team.agents)
    });
    // team listen for agent update status
    socket.on('stateChange', function (){
      socket.emit('sendAgents', teamLoad.team.agents);
      socket.emit('directivesState', teamLoad.team.directives)
    });

  });

  app.get('/', function (req, res){
    res.sendFile(__dirname + '/public/index.html');
  });

  app.get('/api/:team', teamHandler.enter)

};
