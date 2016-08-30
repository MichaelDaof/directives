angular.module('directives.services', [])

.factory('Requests', function ($http){
  // var socket = window.socket;
  var addDirective = function (dir){
    return $http({
      method: 'POST',
      url: 'api/commander/add-dir',
      data: {dir: dir}
    })
  };

  return {
    addDirective: addDirective
  }
})
// attempt socket.io angular side
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
});

