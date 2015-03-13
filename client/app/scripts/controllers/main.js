'use strict';

/**
 * @ngdoc function
 * @name testangularApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the testangularApp
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
        return response.data.results.map(function(item){
          return item.formatted_address;
        });
      });
    };
    $scope.submit = function(key, value){
      return myFactory.sendData(key, value);
    };
  })
  .factory('myFactory', function(){
    var service = {};
    service.destination = '';
    service.location = '';
    service.email = '';
    service.budget = 0;
    service.sendData = function(value){
      this.details[destination] = value;
      console.log(this.details);
    }
    return service;
    return details;
  })