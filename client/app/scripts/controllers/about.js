'use strict';

/**
 * @ngdoc function
 * @name testangularApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the testangularApp
 */
angular.module('wayfareApp')
  .controller('AboutCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
