var path = require('path');

module.exports = function router(app, io){

  // stand in for database
  // will be used in future as a cache for active teams along side DB
  var teamLoad = {
    liveCount: 0, // dev: utility counter to monitor cache activity
    team: {
      name: 'Blackbriar',
      directives: {},
      agents: {}
    }
  };

  // TODO: build websocket connection tracker
  io.on('connection', function(socket){
    console.log('a user connected: ');
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

  app.get('/', function index(req, res){
    teamLoad.liveCount++
    res.sendFile(__dirname + '/clients/index.html');
    // cache monitor
    console.log(teamLoad.liveCount)
  });

  app.post('/api/commander/add-dir', function (req, res){
    teamLoad.team.directives.push(req.body.dir)
    res.end()
  });
};
