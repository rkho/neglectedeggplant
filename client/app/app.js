'use strict';

angular.module('neglectedeggplantApp', [
  // 'ngCookies',
  // 'ngResource',
  // 'ngSanitize',
  // 'ui.router',
  // 'ui.bootstrap'
])
// .config(function ($stateProvider, $urlRouterProvider, $locationProvider) {
//   $urlRouterProvider
//     .otherwise('/');
//   $locationProvider.html5Mode(true); 
// }); 

$(function(){ //Document ready:
  $('#navbar').affix({
    offset: {
      top: $('#topbar').outerHeight(),
    }
  });
});