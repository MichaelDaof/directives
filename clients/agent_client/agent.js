// agent controller
angular.module('directives.agent', [])

.controller('agentCtrl', function ($scope, socket){
  // we have a scope
  $scope.claim = function (key, value){
    console.log('agent controller claim: ', key, value);
    socket.emit('claimDirective', key)
  }
  socket.on('directivesState', function (data){
    $scope.fieldView = data;
    console.log('received on directivesState', data)
  })
})