angular.module('directives.commander', [])

.controller('commanderCtrl', function ($scope, Requests){
  // we have a scope
  $scope.fieldView = [];

  $scope.refreshFieldView = function (){
    var data = Requests.getAllDirs();
    console.log('refreshFieldView: ', data)
  }

  $scope.addDirective = function (directive){
    console.log('addDirective', directive)
    Requests.addDirective(directive);
    $scope.refreshFieldView()
  }


})