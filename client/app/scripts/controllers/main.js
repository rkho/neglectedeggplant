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
    $scope.submit = function(key, value){
      myFactory.sendData(key, value);
    }
    $scope.custObj = myFactory;

    $scope.ok = function(){
      $modalInstance.close();
    }
    $scope.success = function(){
      $http.post('usertodatabase', myFactory)
    }
  })
  .factory('myFactory', function(){
    var service = {};
    // This will take in a key/value pair. Key is either 'destination', 'location', or 'budget' based on which view we're collecting information.
    service.sendData = function(key, value){
      // This line below is only necessary if the key is NOT budget or email, because the string passed along to value is a concatenation of airport data's name + airport code, and we only want the airport code in the end.
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