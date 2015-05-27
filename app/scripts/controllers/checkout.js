'use strict';

angular.module('privateTableApp')
  .controller('checkoutController', ['$scope', '$location', 'SearchBar', 'SearchResults', '$http', 'roomData', function($scope, $location, SearchBar, SearchResults, $http, roomData) {
    $scope.params;
    $scope.room = roomData.currentRoom || {venue: "Sophia Room"};
    $scope.eventConfirmed = false;
    $scope.menuConfirmed = true;
    $scope.toMenu = function() {
      SearchBar.setSearchParams(this.params);
      $scope.params = SearchBar.getSearchParams();
      $location.path('/checkout/menu');
      $scope.eventConfirmed = true;
      $scope.menuConfirmed = false;
    };

    $scope.toPay = function() {
      $location.path('/payments');
    }
        //also reveal menu panel




    $scope.dateInit = function() {
      SearchBar.searchFormInit();
      $scope.params = SearchBar.getSearchParams();
    };

    $scope.dateInit();

  }]);
