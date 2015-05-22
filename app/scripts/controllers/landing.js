'use strict';

angular.module('privateTableApp')
  .controller('landingController', ['$scope', '$location', 'SearchBar', 'SearchResults', function($scope, $location, SearchBar, SearchResults) {
    $scope.searchParams = {};
    $scope.submitSearch = function() {
      //check that all forms are filled before initiating request
      SearchBar.setSearchParams(this.searchParams, SearchResults.reroute);
    };
    $scope.init = function () {
      SearchBar.searchFormInit();
    };

    $scope.init();
  }]);
