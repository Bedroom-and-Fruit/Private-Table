'use strict';

angular.module('privateTableApp')
  .controller('searchBarController', ['$scope', 'SearchBar', 'SearchResults', function($scope, SearchBar, SearchResults) {
    $scope.params;

    $scope.newSearch = function() {
      SearchBar.setSearchParams(this.params);
    };

    $scope.init = function () {
      SearchBar.searchFormInit();
      $scope.params = SearchBar.getSearchParams();
    };

    $scope.init();
  }]);