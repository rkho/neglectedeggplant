'use strict';

// This main module basically controls the entire functionality of our single-page app.
angular.module('wayfareApp')
  .controller('MainCtrl', function ($scope, $http, myFactory, $modal, $location) {
    // data is an undefined variable until it gets populated on line 9
    $scope.data;
    $scope.custObj = {};
    // Get request to 'getAirportData' which is routed in routes.js on the server side, which grabs our Airports.JSON data and assigns the entire object to the $scope.data variable on line 7 above.
    $http.get('getAirportData')
      .then(function(res){
        $scope.data = res.data;
      })
    // Submit will take a key/value pair and send it to the factory on line 25.
    $scope.submit = function(key, value){
      myFactory.sendData(key, value);
    };
    // Four 'getter' functions to access the factory data stored. This is done because Angular controllers reset themselves whenever a view is changed.
    $scope.custObj.getDestination = myFactory.destination;
    $scope.custObj.getHome = myFactory.home;
    $scope.custObj.getBudget = myFactory.budget;
    $scope.custObj.getEmail = myFactory.email;


    // Opens a modal
    $scope.open = function(){
      var modalInstance = $modal.open({
        templateUrl: 'app/views/modal.html',
        controller: 'MainCtrl'
      })
    }

    $scope.success = function(){
      $scope.custObj.getEmail = myFactory.email;
      $http.post('usertodatabase', $scope.custObj)
    }


  })
  .factory('myFactory', function(){
    var service = {};
    // This will take in a key/value pair. Key is either 'destination', 'location', or 'budget' based on which view we're collecting information.
    service.sendData = function(key, value){
      // Line 27 is only necessary if the key is NOT budget or email, because the string passed along to value is a concatenation of airport data's name + airport code, and we only want the airport code in the end.
      if (key === 'destination' || key === 'home'){
        this[key] = value.substr(-3);
      }
      if (key === 'budget' || key === 'email') {
        this[key] = value;
      }
      console.log(this);
    }
    return service;
  })