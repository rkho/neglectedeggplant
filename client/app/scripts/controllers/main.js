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
    $scope.getLocation = function(val) {
      return $http.get('http://maps.googleapis.com/maps/api/geocode/json', {
        params: {
          address: val,
          sensor: false
        }
      }).then(function(response){
        // console.log(response);
        return response.data.results.map(function(item){
          return item.formatted_address;
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