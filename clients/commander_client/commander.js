angular.module('directives.commander', [])

.controller('commanderCtrl', function ($scope, Requests, socket){

  $scope.addDirective = function (directive){
    socket.emit('addDirective', directive)
    $scope.toAdd = "";
  };

  socket.on('directivesState', function (data){
    $scope.fieldView = data;
    console.log('received on directivesState', data)
  })

  socket.on('connect', function (){
    socket.emit('getAgents')
    console.log('connect')
  })

  socket.on('sendAgents', function (agents){
    console.log(agents)
    $scope.agentList = agents;
  })

})