'use strict';

angular.module('privateTableApp')
  .controller('checkoutController', ['$scope', '$location', 'SearchBar', 'SearchResults', function($scope, $location, SearchBar, SearchResults) {
    $scope.data = [{hello: 'no'}, {hello: 'yes'}, {hello: 'huh'}];
    $scope.selectedVenue = {roomName: 'Sophia Room', time: 'November 5, 2015'};
    $scope.dateInit = function() {
      SearchBar.searchFormInit();
    };

    $scope.dateInit();

  }]);
