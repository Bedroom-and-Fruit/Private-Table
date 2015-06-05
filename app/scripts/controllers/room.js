'use strict';


angular.module('privateTableApp')
  .controller('roomController', ['$scope', 'SearchBar', 'SearchResults', 'roomData', '$stateParams', function($scope, SearchBar, SearchResults, roomData, $stateParams) {

    $scope.room = roomData.currentRoom;
    $scope.amenityMore = true;
    $scope.feeMore = true;
    $scope.roomID = $stateParams;

    //FEES View Limit & Full Display methods/properties
    $scope.feeLimit = 4;
    //$scope.fees = $scope.room.fees;
    $scope.feeMoreClick = function () {
      this.liftLimit(this.feeLimit, this.fees, 'feeMore');
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
    };

    $scope.init();
  }]);
