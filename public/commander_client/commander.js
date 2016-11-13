angular.module('directives.commander', [])

.controller('commanderCtrl', function ($scope, Requests, socket){

  //// INIT /////////////
  socket.emit('getAgents')
  socket.emit('refresh')
  ///////////////////////

  // create jobs for all team
  $scope.addDirective = function (directive){
    socket.emit('addDirective', directive)
    $scope.toAdd = "";
  };
  // websocket listen for all updates
  socket.on('directivesState', function (data){
    $scope.fieldView = data;
    console.log('received on directivesState', data)
  })
  // websocket update for agent status
  socket.on('sendAgents', function (agents){
    console.log(agents)
    $scope.agentList = agents;
  })

})
