'use strict';


angular.module('privateTableApp')
  .controller('roomController', ['$scope', 'SearchBar', 'SearchResults', 'roomData', function($scope, SearchBar, SearchResults, roomData) {

    $scope.room = roomData.currentRoom;
    $scope.amenityMore = true;
    $scope.feeMore = true;

    //FEES View Limit & Full Display methods/properties
    $scope.feeLimit = 4;
    //$scope.fees = $scope.room.fees;
    $scope.feeMoreClick = function () {
      this.liftLimit(this.feeLimit, this.fees, 'feeMore');
    } 


    //AMENITIES View Limit & Full Display methods/properties
    //$scope.amenities = $scope.room.amenities;
    $scope.amenityLimit = 4;
    $scope.amenityMoreClick = function () {
      this.liftLimit(this.amenityLimit, this.amenities, 'amenityMore');
    } 

    $scope.liftLimit = function (limit, list, more) {
      //when lists of amenities and fees are available, uncomment below
      //limit = list.length;
      $scope[more] = false;

    }

    $scope.init = function () {
      SearchBar.searchFormInit();
    };

    $scope.init();
  }]);
