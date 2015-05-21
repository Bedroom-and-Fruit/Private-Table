'use strict';

angular.module('privateTableApp')
  .controller('landingController', ['$scope', '$location', 'SearchBar', function($scope, $location, SearchBar) {
    $scope.searchParams = {};
    $scope.submitSearch = function() {
      //check that all forms are filled before initiating request
      SearchBar.setSearchParams(this.searchParams);
      //define searchParams
      //initiate route to dashboard
    };
    $scope.init = function () {
      SearchBar.searchFormInit();
    }

    $scope.init();
  }])
