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
.controller('portalCtrl', function ($scope, $rootScope, $state, State, Requests, socket){
  $scope.teamName = State.teamName;
  $scope.createAgent = function (name){
    var agent = {
      name: $scope.newAgent,
      status: '#D8BFD8',
      directive: null
    }
    // TODO: refactor to model/state architecture
    $rootScope.agent = agent;
    socket.emit('newAgent', agent)
    $scope.newAgent = "";
    console.log('createAgent ', agent)
    $state.go('agent')
  }
  $scope.goCommand = function(){
    $state.go('commander')
  }
})
