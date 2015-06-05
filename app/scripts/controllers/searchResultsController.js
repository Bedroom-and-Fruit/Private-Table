'use strict';

angular.module('privateTableApp')
  .controller('searchResultsController', ['$scope', '$http','$location', 'SearchResults', 'roomData', function( $scope, $http, $location, SearchResults, roomData) {
    $scope.roomResults = SearchResults.searchResults;

    $scope.bookingType = function (room) {
     return (SearchResults.bookingsSelection(room)) ?  true : false;
    };

    $scope.viewRoom = function (room) {
      roomData.viewRoom(room.roomID, 'api/room/', null, roomData.reroute('/checkout/room/', room.roomID));
    };
  }]);