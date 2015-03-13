'use strict';

/**
 * @ngdoc function
 * @name testangularApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the testangularApp
 http://maps.googleapis.com/maps/api/geocode/json
 */
angular.module('wayfareApp')
  .controller('MainCtrl', function ($scope, $http, myFactory) {
    $scope.getLocation = function(name) {
      return $http.get('/getAirportData', {
        params: {
          name: name,
        }
      }).then(function(response){
        console.log('hello');
        return response.data.results.map(function(item){
          return item.name;
        });
      });
    };
    $scope.submit = function(key, value){
      myFactory.sendData(key, value);
    };
    $scope.getDestination = myFactory.destination;
    $scope.getHome = myFactory.home;
    $scope.budget = myFactory.budget;
  })
  .factory('myFactory', function(){
    var service = {};
    service.sendData = function(key, value){
      this[key] = value;
      console.log(this);
    }
    return service;
  })