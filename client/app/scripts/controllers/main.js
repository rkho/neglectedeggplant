'use strict';

// This main module basically controls the entire functionality of our single-page app.
angular.module('wayfareApp')
  .controller('MainCtrl', function ($scope, $http, myFactory, $modal, $location) {
    // data is an undefined variable until it gets populated on line 9
    $scope.data;
    // Pass on 'myFactory' functions and properties over to the scope of the Main Controller. This grants it access to the 'sendData' function as well as the destination, home, budget, and email properties when needed.
    $scope.custObj = myFactory;
    // Get request to 'getAirportData' which is routed in routes.js on the server side, which grabs our Airports.JSON data and assigns the entire object to the $scope.data variable above.
    $http.get('getAirportData')
      .then(function(res){
        $scope.data = res.data;
      })
    // Opens a modal
    $scope.open = function(){
      var modalInstance = $modal.open({
        templateUrl: 'app/views/modal.html',
        controller: 'ModalInstanceCtrl'
      })
    }
  })
  .controller('ModalInstanceCtrl', function($scope, $modalInstance, $http, myFactory){
    // This controller is used specifically for the modeal that appears which requests for the user's email as the last part of the submission process.
    $scope.custObj = myFactory;
    // This function closes the modal.
    $scope.ok = function(){
      $modalInstance.close();
    }
    // This function sends the entire factory object to the database (which will send the destination, home location, budget, and email address).
    $scope.success = function(){
      $http.post('usertodatabase', myFactory)
    }
  })
  .controller('RecsCtrl', function($scope, $http, myFactory){
    $scope.randomData = _.shuffle($scope.randomData) || '';
    $http.get('getSuggestedData')
      .then(function(res){
        $scope.randomData = _.shuffle(res.data);
      })
    $scope.custObj = myFactory;
  })
  .factory('myFactory', function(){
    var service = {};
    // Iterate across the keys of LocalStorage and set service[key] to equal that specific value. This is so we can persist data through refreshes.
    _.each(Object.keys(localStorage), function(elem){
      service[elem] = localStorage[elem];
      console.log(service[elem]);
    })

    // This will take in a key/value pair. The following keys are collected: 'destination', 'home', 'budget', 'email', and (soon) 'phone'.
    service.sendData = function(key, value){
      localStorage.removeItem(key);
      localStorage[key] = value;
      this[key] = value;
    }
    return service;
  })
