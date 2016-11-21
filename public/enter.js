angular.module('directives.enter', [])

.controller('enterCtrl', function ($scope, $state, State, Requests){

  $scope.goTeam = function(name){
    console.log("onSubmit for team fired")
    Requests.startTeam(name)
      .then(res => {
        return res.data
      })
      .then(data => {
        State.teamName = data.teamName;
        $state.go('portal')
      })
  }

})
.controller('portalCtrl', function ($scope, State, $state, Requests){
  $scope.teamName = State.teamName;
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
