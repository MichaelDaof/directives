angular.module('directives.services', [])

.factory('State', function (){
  var state = {
    teamName: undefined,
    lead: {
      is: false
    },
    member: {
      is: false,
      name: null
    },
    directives: []
  }

  return state
})
.factory('Requests', function ($http, $rootScope, State){

  var startTeam = function (name){
    State.teamName = name;
    console.log("start team fired")
    return $http({
      method: 'GET',
      url: `/api/${name}`,
    })
  }

  return {
    startTeam
  }
})
// Initiate socket.io here
.factory('socket', function ($rootScope) {
  var socket = io.connect();
  return {
    on: function (eventName, callback) {
      socket.on(eventName, function () {
        var args = arguments;
        $rootScope.$apply(function () {
          callback.apply(socket, args);
        });
      });
    },
    emit: function (eventName, data, callback) {
      socket.emit(eventName, data, function () {
        var args = arguments;
        $rootScope.$apply(function () {
          if (callback) {
            callback.apply(socket, args);
          }
        });
      })
    }
  };
})
.directive('drAgentStatus', function (){
  return {
    link: function(scope, elements, attrs){
      attrs.$set('background-color', scope.agent.status)
    }
  }
});
