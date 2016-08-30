angular.module('directives', [
  'directives.commander',
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

  $urlRouterProvider.otherwise('/')
  
})