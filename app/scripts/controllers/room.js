'use strict';


angular.module('privateTableApp')
  .controller('roomController', ['$scope', 'SearchBar', 'SearchResults', 'roomData', '$stateParams', '$state', function($scope, SearchBar, SearchResults, roomData, $stateParams, $state) {

    $scope.room = roomData.currentRoom;
    $scope.amenityMore = true;
    $scope.feeMore = true;
    $scope.roomID = $stateParams;
    $scope.SearchBar = SearchBar;
    $scope.searchParams = SearchBar.searchParams;

    //FEES View Limit & Full Display methods/properties
    $scope.feeLimit = 4;
    //$scope.fees = $scope.room.fees;
    $scope.feeMoreClick = function () {
      this.liftLimit(this.feeLimit, this.fees, 'feeMore');
    };

    $scope.toBookings = function() {
      $state.go('bookings');
    };
    //AMENITIES View Limit & Full Display methods/properties
    //$scope.amenities = $scope.room.amenities;
    $scope.amenityLimit = 4;
    $scope.amenityMoreClick = function () {
      this.liftLimit(this.amenityLimit, this.amenities, 'amenityMore');
    }; 

    $scope.liftLimit = function (limit, list, more) {
      //when lists of amenities and fees are available, uncomment below
      //limit = list.length;
      $scope[more] = false;

    };

    $scope.init = function () {
      SearchBar.searchFormInit();
      if (typeof parseInt($stateParams.roomID) === 'number') {
        roomData.viewRoom($stateParams.roomID, 'api/room/', function() {
          $scope.room = roomData.getRoom();
        }, roomData.reroute('/checkout/room/', $stateParams.roomID));
      }
      $scope.room = roomData.getRoom();
      if ($scope.searchParams) {
        if ($scope.searchParams.eventType) {
          roomData.viewMenus($stateParams.roomID, $scope.searchParams.eventType);
        } else {
          roomData.viewMenus($stateParams.roomID);
        }
      } else {
        roomData.viewMenus($stateParams.roomID);
      }
    };
    $scope.init();
  }]);
