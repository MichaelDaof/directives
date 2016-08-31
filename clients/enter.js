angular.module('directives.enter', [])

.controller('enterCtrl', function ($scope, $rootScope, $state, socket){
  $scope.createAgent = function (name){
    var agent = {
      name: $scope.newAgent,
      status: '#D8BFD8',
      directive: null
    }
    $rootScope.agent = agent;
    socket.emit('newAgent', agent)
    $scope.newAgent = "";
    console.log('createAgent ', agent)
    $state.go('agent')
  }
})
