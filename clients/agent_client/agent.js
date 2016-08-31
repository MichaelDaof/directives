// agent controller
angular.module('directives.agent', [])

.controller('agentCtrl', function ($scope, $rootScope, socket){
  // we have a scope
  $scope.claim = function (key, value){
    $rootScope.agent.status = 'yellow';
    $rootScope.agent.directive = value;
    socket.emit('claimDirective', key);
    socket.emit('agentUpdate', $rootScope.agent); 
  };
  $scope.complete = function (){
    $rootScope.agent.status = 'green';
    socket.emit('agentUpdate', $rootScope.agent);
  }
  socket.on('directivesState', function (data){
    $scope.fieldView = data;
    console.log('received on directivesState', data)
  })
})
