// agent controller
angular.module('directives.agent', [])

.controller('agentCtrl', function ($scope, $rootScope, socket, State){
  // init
  socket.emit('refresh')
  //////////////////////

  // map State to scope
  // NOTE: consider two-way binding
  $scope.teamName = State.teamName
  //////////////////////

  // status update for accepting jobs
  $scope.claim = function (key, value){
    $rootScope.agent.status = 'yellow';
    $rootScope.agent.directive = value;
    socket.emit('claimDirective', key);
    socket.emit('agentUpdate', $rootScope.agent);
  };
  // status update for completing jobs
  $scope.complete = function (){
    $rootScope.agent.status = 'green';
    socket.emit('agentUpdate', $rootScope.agent);
  }
  // websocket listener for all activity
  socket.on('directivesState', function (data){
    $scope.fieldView = data;
    console.log('received on directivesState', data)
  })
})
