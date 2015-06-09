'use strict';

angular.module('privateTableApp')
  .controller('checkoutController', ['$scope', '$location', 'SearchBar', 'SearchResults', 'CheckoutOptions', '$http', 'roomData', '$stateParams', function($scope, $location, SearchBar, SearchResults, CheckoutOptions, $http, roomData, $stateParams) {
    $scope.params = {};
    $scope.room;
    $scope.eventConfirmed = false;
    $scope.menuConfirmed = true;
    $scope.menuLabel = true;
    $scope.showSummary = true;
    $scope.available = false;
    $scope.menuFinal = true;
    $scope.checkoutMenu = roomData;

    $scope.toMenu = function() {
      CheckoutOptions.setEventParams($scope.params);
      $scope.params = CheckoutOptions.getEventParams();
      $scope.eventConfirmed = true;
      $scope.menuLabel = false;
      $scope.menuConfirmed = false;
      console.log(roomData);
      console.log($scope.checkoutMenu);
      roomData.reroute('/checkout/menu');
    };

    $scope.toPay = function() {
      CheckoutOptions.setMenuParams(roomData.currentMenu);
      $location.path('/checkout/payments');
      $scope.menuName = true;
      $scope.menuFinal = false;
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
          $scope.allBookedTimes = roomData.getAllBookedTimes();
        }, roomData.reroute('/checkout/room/', $stateParams.roomID));
      }
      $scope.room = roomData.getRoom();
      $scope.allBookedTimes = roomData.getAllBookedTimes();
    };

    $scope.dateSearch = function() {
      var startTimeStamp = "";
      var endTimeStamp = "";
      //time format: YYYY-MM-DD HH:MM:SS
      startTimeStamp = SearchResults.createDate($scope.params.date, startTimeStamp);
      endTimeStamp = SearchResults.createDate($scope.params.date, endTimeStamp);
      startTimeStamp +=' 00:00:00';
      endTimeStamp +=' 23:59:59';
      roomData.findAvailableTimes($scope.room.id, 'api/dates', startTimeStamp, endTimeStamp, function() {
        $scope.allBookedTimes = roomData.getAllBookedTimes();
        if ($scope.params.endTime && $scope.params.startTime) {
          $scope.checkTime($scope.params.startTime, $scope.params.endTime);
        }
      });
      
    };

    $scope.checkTime = function(start, end) {
      if (start && end) {
        var convertedStartTime = SearchResults.timeConverter(start);
        var convertedEndTime = SearchResults.timeConverter(end);
        var available = false;
        $scope.allBookedTimes.forEach(function(times){
          var startTime = SearchResults.dbTimeConverter(times.start);
          var endTime = SearchResults.dbTimeConverter(times.end);
          if (((convertedStartTime >= startTime) && (convertedStartTime <= endTime)) ||
            ((convertedEndTime >= startTime) && (convertedEndTime <= endTime))) {
            available = true;
          }
        });
        $scope.available = available;
      }
    };

    $scope.setMinEndTime = function () {
      var minEndTime = SearchBar.endTimeAdjuster(this.params.startTime);
      $('#eventend').datetimepicker({datepicker:false, format: 'g:i A', formatTime: 'g:i A', step: 30, minTime: minEndTime});
    };

    $scope.dateInit();

  }]);
