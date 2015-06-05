'use strict';

angular.module('privateTableApp')
  .controller('checkoutController', ['$scope', '$location', 'SearchBar', 'SearchResults', 'CheckoutOptions', '$http', 'roomData', '$stateParams', function($scope, $location, SearchBar, SearchResults, CheckoutOptions, $http, roomData, $stateParams) {
    $scope.params = {};
    $scope.room;
    //this is what i envision storing all our available dates that should be from our roomFactory
    $scope.bookedStartTimes;
    $scope.bookedEndTimes;
    
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
    };
        //also reveal menu panel

    $scope.dateInit = function() {
      SearchBar.searchFormInit();
      $scope.params = CheckoutOptions.getEventParams();
      if (typeof parseInt($stateParams.roomID) === 'number') {
        roomData.viewRoom($stateParams.roomID, 'api/room/', function() {
          $scope.room = roomData.getRoom();
          $scope.bookedStartTimes = roomData.getStartTimes();
          $scope.bookedEndTimes = roomData.getEndTimes();
        }, roomData.reroute('/checkout/room/', $stateParams.roomID));
      }
      $scope.room = roomData.getRoom();
      $scope.bookedStartTimes = roomData.getStartTimes();
      $scope.bookedEndTimes = roomData.getEndTimes();
    };

    $scope.dateSearch = function() {
      roomData.viewRoom($scope.room.id, 'api/dates/');
    };

    $scope.checkStartTime = function() {
      console.log($scope.params.startTime);
    };

    $scope.checkEndTime = function() {
      console.log($scope.params.endTime);
    }

    $scope.setMinEndTime = function () {
      var minEndTime = SearchBar.endTimeAdjuster(this.params.startTime);
      console.log(minEndTime);
      $('#eventend').datetimepicker({datepicker:false, format: 'g:i A', formatTime: 'g:i A', step: 30, minTime: minEndTime});
    };

    $scope.dateInit();

  }]);
