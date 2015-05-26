'use strict';

angular.module('privateTableApp')
  .controller('searchResultsController', ['$scope', 'SearchResults', function($scope, SearchResults) {
    $scope.data = {};
    $scope.roomResults = [];
    $scope.params;
    $scope.getSearchResults = function() {
      // $scope.data.information = SearchResults.searchResults.hits;
      // $scope.params = SearchResults.searchParams;
      // SearchResults.getResults().then(function(information) {
      //   $scope.data.information = information.hits;
      //});
    };
    

    $scope.init = function () {
      SearchResults.searchFormInit();
      $scope.params = SearchResults.getSearchParams();
    };

    $scope.init();
  }]);