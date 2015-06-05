'use strict';

angular.module('roomFactory', [])

.factory('roomData', ['SearchResults', '$location', '$http', function(SearchResults, $location, $http) {
  var currentRoom;
  var roomID;
  var menus = [];

  var viewRoom = function(room, callback) {
    var url = 'api/room/' + room.roomID;
    return $http({
      method: 'GET',
      url: url
    })
    .then(function(response){
      // console.log(response.data);
      roomID = response.data.id;
      currentRoom = response.data;
      currentRoom.menuPrices = currentRoom.menuPrices.sort(function(a,b){return a-b;});
      if (callback) {
        callback();
      }
      $location.url($location.path());
      $location.path('/checkout/room/'+roomID);
      });
  };

  var getRoom = function() {
    console.log(currentRoom);
    return currentRoom;
  };

  return {
    menus: menus,
    currentRoom: currentRoom,
    viewRoom: viewRoom,
    getRoom: getRoom
  };

}]);