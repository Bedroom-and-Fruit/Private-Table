'use strict';

angular.module('roomFactory', [])

.factory('roomData', ['SearchResults', '$location', '$http', function(SearchResults, $location, $http) {
  var currentRoom;
  var menus = [];

  var viewRoom = function(room) {
    var url = 'api/room/' + room.roomID
    return $http({
      method: 'GET',
      url: url
    })
    .then(function(response){
      console.log(response.data);
      currentRoom = response.data;
      $location.path('/checkout/room');
      });
  };

  var getRoom = function() {
    return currentRoom;
  }

  return {
    menus: menus,
    currentRoom: currentRoom,
    viewRoom: viewRoom,
    getRoom: getRoom
  };

}]);