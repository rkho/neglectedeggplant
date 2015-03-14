'use strict';

// This main module basically controls the entire functionality of our single-page app.
angular.module('wayfareApp')
  .controller('MainCtrl', function ($scope, $http, myFactory) {
    // data is an undefined variable until it gets populated on line 9
    $scope.data;
    // Get request to 'getAirportData' which is routed in routes.js on the server side, which grabs our Airports.JSON data and assigns the entire object to the $scope.data variable on line 7 above.
    $http.get('getAirportData')
      .then(function(res){
        $scope.data = res.data;
      })
    // Submit will take a key/value pair and send it to the factory on line 25.
    $scope.submit = function(key, value){
      myFactory.sendData(key, value);
    };
    // Three 'getter' functions to access the factory data stored. This is done because Angular controllers reset themselves whenever a view is changed.
    $scope.getDestination = myFactory.destination;
    $scope.getHome = myFactory.home;
    $scope.getBudget = myFactory.budget;
  })
  .factory('myFactory', function(){
    var service = {};
    // This will take in a key/value pair. Key is either 'destination', 'location', or 'budget' based on which view we're collecting information.
    service.sendData = function(key, value){
      // Line 27 is only necessary if the key is NOT budget, because the string passed along to value is a concatenation of airport data's name + airport code, and we only want the airport code in the end.
      if (key !== 'budget') this[key] = value.substr(-3);
    }
    return service;
  })