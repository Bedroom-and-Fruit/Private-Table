'use strict';

angular.module('privateTableApp')
  .controller('checkoutController', ['$scope', '$location', 'SearchBar', 'SearchResults', function($scope, $location, SearchBar, SearchResults) {
    $scope.data = [{hello: 'no'}, {hello: 'yes'}, {hello: 'huh'}];
    $scope.select = function() {
    };

  }]);
