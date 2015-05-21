'use strict';

angular.module('privateTableApp')
  .controller('searchBarController', ['$scope', 'SearchBar', function($scope, SearchBar) {
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
      SearchBar.searchFormInit();
      $scope.params = SearchBar.getSearchParams();
    };

    $scope.init();
  }]);