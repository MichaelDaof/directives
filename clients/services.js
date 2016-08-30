angular.module('directives.services', [])

.factory('Requests', function ($http){
  var addDirective = function (dir){
    return $http({
      method: 'POST',
      url: 'api/commander/add-dir',
      data: {dir: dir}
    })
  };

  var getAllDirs = function (){
    return $http({
      method: 'GET',
      url: 'api/get-all'
    })
  }

  return {
    addDirective: addDirective,
    getAllDirs: getAllDirs
  }
})