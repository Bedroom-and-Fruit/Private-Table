'use strict';

angular.module('privateTableApp')
  .controller('favoritesController', ['$scope','Favorites','roomData', 'Auth', '$cookies', function($scope, Favorites, roomData, Auth, $cookies) {
    $scope.Favorites = Favorites;
    $scope.roomData = roomData;
    $scope.Auth = Auth;

    $scope.viewRoom = function(room) {
      roomData.viewRoom(room.roomID, 'api/room/', null, roomData.reroute('/checkout/room/', room.roomID));
    };

    $scope.init = function () {
      Favorites.getFavorites();
      Auth.checkLoggedIn();
    };

    $scope.init();
  }]);