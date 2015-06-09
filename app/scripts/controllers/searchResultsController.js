'use strict';

angular.module('privateTableApp')
  .controller('searchResultsController', ['$scope', '$http','$location', 'SearchResults', 'roomData', '$cookies', 'Auth', 'Favorites', function($scope, $http, $location, SearchResults, roomData, $cookies, Auth, Favorites) {
    $scope.roomResults = SearchResults.searchResults;
    $scope.Auth = Auth;
    $scope.Favorites = Favorites;

    $scope.checkLoggedIn = function() {
      if ($cookies.get('PrivateTableToken')) {
        $scope.Auth.loggedIn = true;
      };
    };

    $scope.bookingType = function (room) {
     return (SearchResults.bookingsSelection(room)) ?  true : false;
    };

    $scope.viewRoom = function (room) {
      roomData.viewRoom(room.roomID, 'api/room/', null, roomData.reroute('/checkout/room/', room.roomID));
    };

    $scope.addFavorite = function(room) {
      Favorites.addFavorite(room.roomID);
    };

    $scope.removeFavorite = function(room) {
      console.log(room);
      Favorites.removeFavorite(room.roomID);
    };

    $scope.init = function() {
      $scope.checkLoggedIn();
      if ($scope.Auth.loggedIn) {
        $scope.Favorites.getFavorites();
      }
    };

    $scope.init();

  }]);