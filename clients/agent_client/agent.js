// agent controller
angular.module('directives.agent', [])

.controller('agentCtrl', function ($scope){
  // we have a scope
  $scope.fieldView = ['bourne', 'stiles'];
  $scope.grab = function (index){
    $scope.fieldView.splice(index, 1)
  }
})