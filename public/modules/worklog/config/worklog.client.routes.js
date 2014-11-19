'use strict';

// Setting up route
angular.module('worklog')

    .config(['$stateProvider', '$urlRouterProvider',
       function($stateProvider, $urlRouterProvider) {
         // For unmatched routes:
         $urlRouterProvider.otherwise('/');

         // states for my app

         $stateProvider
           .state('targetUser', {
             url: '/worklog/user/{targetUser}',
             templateUrl: 'modules/worklog/views/worklog.client.view.html'
         })

           .state('targetGroup', {
             url: '/worklog/group/{targetGroup}',
             templateUrl: 'modules/worklog/views/worklog.client.view.html'
         })

             .state('search', {
               url: '/search',
               templateUrl: 'modules/worklog/views/worklog.client.view.html'
           });
       }
     ]);
