angular.module('directives.commander', [])

.controller('commanderCtrl', function ($scope, Requests, socket){

  $scope.addDirective = function (directive){
    socket.emit('addDirective', directive)
  };

  socket.on('directivesState', function (data){
    $scope.fieldView = data;
    console.log('received on directivesState', data)
  })


})