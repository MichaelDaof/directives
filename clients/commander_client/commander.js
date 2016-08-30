angular.module('directives.commander', [])

.controller('commanderCtrl', function ($scope){
  // we have a scope
  $scope.fieldView = ['bourne', 'stiles'];

  $scope.addDirective = function (directive){
    $scope.field.push(directive);

  }
})