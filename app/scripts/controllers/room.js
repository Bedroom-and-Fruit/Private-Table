'use strict';

angular.module('privateTableApp')
  .controller('roomController', ['$scope', '$location', 'SearchBar', 'SearchResults', function($scope, $location, SearchBar, SearchResults) {

    $scope.roomSelection = {};

    //FEES View Limit & Full Display methods/properties
    $scope.feeLimit = 4;
    $scope.fees = $scope.roomSelection.fees;
    $scope.feeMoreClick = function () {
      this.liftLimit(this.feeLimit, this.fees, this.feeMore);
    } 

    //AMENITIES View Limit & Full Display methods/properties
    $scope.amenities = $scope.roomSelection.amenities;
    $scope.amenityLimit = 4;
    $scope.amenityMoreClick = function () {
      this.liftLimit(this.amenityLimit, this.amenities, this.amenityMore);
    } 

    $scope.liftLimit = function (limit, list, more) {
      limit = list.length;
      this[more] = false;
    }

    $scope.init = function () {
      SearchBar.searchFormInit();
      $scope.amenityMore = true;
      $scope.feeMore = true;
    };

    $scope.init();
  }]);
