'use strict';

angular.module('privateTableApp')
  .controller('checkoutController', ['$scope', '$location', 'SearchBar', 'SearchResults', 'CheckoutOptions' '$http', 'roomData', function($scope, $location, SearchBar, SearchResults, CheckoutOptions, $http, roomData) {
    $scope.params;
    $scope.params.room = roomData.currentRoom || {venue: "Sophia Room"};
    $scope.eventConfirmed = false;
    $scope.menuConfirmed = true;
    $scope.toMenu = function() {
      CheckoutOptions.setEventParams(this.params);
      $scope.params = CheckoutOptions.getEventParams();
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
      $scope.params = CheckoutOptions.getEventParams();
    };



    $scope.dateInit();

  }]);
