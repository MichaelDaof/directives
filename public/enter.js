angular.module('directives.enter', [])

.controller('enterCtrl', function ($scope, $rootScope, $state, Requests){

  $scope.goTeam = function(name){
    console.log("onSubmit for team fired")
    Requests.startTeam(name)
      .then(res => {
        console.log("Response: ", res)
        $state.go('portal')
      })
  }

})
.controller('portalCtrl', function ($scope, $rootScope, $state, Requests){
  $scope.test = "Hi everybody. This is a test."
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
