'use strict';

angular.module('privateTableApp')
  .controller('searchResultsController', ['$scope', 'SearchResults', function($scope, SearchResults) {
    $scope.data = SearchResults.searchResults;
  }]);