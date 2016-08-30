angular.module('directives', [
  'directives.commander',
  'directives.agent',
  'directives.services',
  'ui.router'
  ])
.config(function ($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('enter', {
      url: '/',
      templateUrl: 'clients/enter.html'
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