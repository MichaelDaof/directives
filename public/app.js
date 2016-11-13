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
      templateUrl: 'public/enter.html',
      controller: 'enterCtrl'
    })
    .state('commander', {
      templateUrl: 'public/commander_client/commander.html',
      controller: 'commanderCtrl'
    })
    .state('agent', {
      templateUrl: 'public/agent_client/agent.html',
      controller: 'agentCtrl'
    })
    .state('portal', {
      templateUrl: 'public/portal.html',
      controller: 'portalCtrl'
    })

  $urlRouterProvider.otherwise('/')

})
.controller('masterCtrl', function ($rootScope, socket){
  $rootScope.$on('$stateChangeStart', function (event){
    socket.emit('stateChange')
  })
})
