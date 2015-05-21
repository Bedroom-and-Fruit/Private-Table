'use strict';

angular.module('privateTableApp')
  .controller('searchResultsController', ['$scope', 'SearchResults', function($scope, SearchResults) {
    $scope.data = {};
    $scope.roomResults = [];
    $scope.params = SearchResults.searchParams;
    $scope.getSearchResults = function() {
      SearchResults.getResults().then(function(information) {
        $scope.data.information = information.hits;
      });
    };

    $scope.getSearchResults();

  }]);