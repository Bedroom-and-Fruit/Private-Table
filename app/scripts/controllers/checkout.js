'use strict';

angular.module('privateTableApp')
  .controller('checkoutController', ['$scope', '$location', 'SearchBar', 'SearchResults', 'CheckoutOptions', '$http', 'roomData', '$stateParams', function($scope, $location, SearchBar, SearchResults, CheckoutOptions, $http, roomData, $stateParams) {
    $scope.params;
    $scope.room;
    
    $scope.eventConfirmed = false;
    $scope.menuConfirmed = true;
    $scope.menuLabel = true;
    $scope.showSummary = true;

    $scope.toMenu = function() {
      CheckoutOptions.setEventParams(this.params);
      $scope.params = CheckoutOptions.getEventParams();
      $location.path('/checkout/menu');
      $scope.eventConfirmed = true;
      $scope.menuLabel = false;
      $scope.menuConfirmed = false;
    };

    $scope.toPay = function() {
      $location.path('/checkout/payments');
      $scope.menuConfirmed = true;
      $scope.showSummary = false;
    }
        //also reveal menu panel

    $scope.dateInit = function() {
      SearchBar.searchFormInit();
      $scope.params = CheckoutOptions.getEventParams();
      if ($stateParams) {
        roomData.viewRoom($stateParams, function() {
          $scope.room = roomData.getRoom();
        });
      }
      $scope.room = roomData.getRoom();
    };


    $scope.dateInit();

  }]);
