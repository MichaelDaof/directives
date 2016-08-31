angular.module('directives', [
  'directives.commander',
  'directives.agent',
  'directives.services',
  'directives.enter',
  'ui.router'
  ])
.config(function ($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('enter', {
      url: '/',
      templateUrl: 'clients/enter.html',
      controller: 'enterCtrl'
    })
    .state('commander', {
      templateUrl: 'clients/commander_client/commander.html',
      controller: 'commanderCtrl'
    })
    .state('agent', {
      templateUrl: 'clients/agent_client/agent.html',
      controller: 'agentCtrl'
    })

  $urlRouterProvider.otherwise('/')
  
})
.controller('masterCtrl', function ($rootScope, socket){
  $rootScope.$on('$stateChangeStart', function (event){
    socket.emit('stateChange')
  })
})