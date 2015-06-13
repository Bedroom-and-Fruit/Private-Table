'use strict';

angular.module('privateTableApp')
  .controller('checkoutController', ['$scope', '$location', 'SearchBar', 'SearchResults', 'CheckoutOptions', '$http', 'roomData', '$stateParams', 'Auth', function($scope, $location, SearchBar, SearchResults, CheckoutOptions, $http, roomData, $stateParams, Auth) {
    $scope.params = SearchBar;
    $scope.room;
    $scope.allBookedTimes;
    $scope.eventConfirmed = false;
    $scope.menuConfirmed = true;
    $scope.menuLabel = true;
    $scope.showSummary = true;
    $scope.available = false;
    $scope.menuFinal = true;
    $scope.checkoutMenu = roomData;
    $scope.Auth = Auth;
    $scope.roomData = roomData;

    $scope.toMenu = function() {
      $scope.eventConfirmed = true;
      $scope.menuLabel = false;
      $scope.menuConfirmed = false;
      $('#roomtab').removeClass('active');
      $('#menutab').addClass('active');
      roomData.reroute('/checkout/menu');
    };

    $scope.toRoom = function () {
      $('#roomtab').addClass('active');
      $('#menutab').removeClass('active');
      roomData.reroute('/checkout/room/'+$scope.room.id);
    };

    $scope.toPay = function() {
      $('.active').removeClass('active');
      $location.path('/checkout/payments');
      $scope.menuName = true;
      $scope.menuFinal = false;
      $scope.menuConfirmed = true;
      $scope.showSummary = false;
    };
        //also reveal menu panel

    $scope.dateInit = function() {
      SearchBar.searchFormInit();
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
      startTimeStamp = SearchResults.createDate($scope.params.searchParams.date, startTimeStamp);
      endTimeStamp = SearchResults.createDate($scope.params.searchParams.date, endTimeStamp);
      startTimeStamp +=' 00:00:00';
      endTimeStamp +=' 23:59:59';
      roomData.findAvailableTimes($scope.room.id, 'api/dates', startTimeStamp, endTimeStamp, function() {
        $scope.allBookedTimes = roomData.getAllBookedTimes();
        if ($scope.params.searchParams.endTime && $scope.params.searchParams.startTime) {
          $scope.checkTime($scope.params.searchParams.startTime, $scope.params.searchParams.endTime);
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
      var minEndTime = SearchBar.endTimeAdjuster($scope.params.searchParams.startTime);
      $('#eventend').datetimepicker({datepicker:false, format: 'g:i A', formatTime: 'g:i A', step: 30, minTime: minEndTime});
    };

    $scope.dateInit();
    $scope.Auth.checkLoggedIn();

  }]);
