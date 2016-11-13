angular.module('directives.enter', [])

.controller('enterCtrl', function ($scope, $rootScope, Requests, $state){

  $scope.goTeam = function(name){
    console.log("onSubmit for team fired")
    Requests.startTeam(name)
      .then(res => {
        console.log("Response: ", res.data)
        $state.go('portal')
      })
  }

})
.controller('portalCtrl', function ($scope, $rootScope, $state, Requests){
  $scope.test = "Hi every body. This is a test."
})


// $scope.createAgent = function (name){
//   var agent = {
//     name: $scope.newAgent,
//     status: '#D8BFD8',
//     directive: null
//   }
//   $rootScope.agent = agent;
//   socket.emit('newAgent', agent)
//   $scope.newAgent = "";
//   console.log('createAgent ', agent)
//   $state.go('agent')
// }
