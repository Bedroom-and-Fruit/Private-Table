'use strict';

angular.module('privateTableApp')
  .controller('landingController', ['$scope', 'SearchResults', function($scope, $location, SearchResults) {
    $scope.searchParams;
    $scope.submitSearch = function() {
      //check that all forms are filled before initiating request
      SearchResults.getResults(this.searchParams);
      //define searchParams
      //initiate route to dashboard
    };

  
    // stores search parameters
    // has search function
  }])
