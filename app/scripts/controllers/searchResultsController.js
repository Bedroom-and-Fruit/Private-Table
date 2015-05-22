'use strict';

angular.module('privateTableApp')
  .controller('searchResultsController', ['$scope', 'SearchResults', function($scope, SearchResults) {
    // angular.extend($scope, SearchResults);
    $scope.data = SearchResults.searchResults;
    // as the scope.data changes, the view in ng-repeat will also change
    // $scope.getSearchResults = function() {
    //   $scope.data = SearchResults.searchResults;
    // };

  }]);