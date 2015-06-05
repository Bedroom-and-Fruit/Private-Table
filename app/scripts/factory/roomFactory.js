'use strict';

angular.module('roomFactory', [])

.factory('roomData', ['SearchResults', '$location', '$http', function(SearchResults, $location, $http) {
  var currentRoom;
  var roomID;
  var bookedStartTimes = [];
  var bookedEndTimes = [];
  var menus = [];

  var viewRoom = function(room, url, callback, reroute) {
    var toUrl = url + room;
    return $http({
      method: 'GET',
      url: toUrl
    })
    .then(function(response) {
      if (response.data.venueName) {
      roomID = response.data.id;
      currentRoom = response.data;
      currentRoom.menuPrices = currentRoom.menuPrices.sort(function(a,b){return a-b;});
      }

      if (response.data.bookedStartTimes) {
        bookedStartTimes.splice(0, bookedStartTimes.length);
        response.data.bookedStartTimes.forEach(function(val){
          bookedStartTimes.push(val);
        });
        bookedEndTimes.splice(0, bookedEndTimes.length);
        response.data.bookedEndTimes.forEach(function(val){
          bookedEndTimes.push(val);
        });
      }
      
      if (callback) {
        callback();
      }
      if (reroute) {
        reroute();
      }
      });
  };

  var reroute = function(url, roomID) {
    $location.url($location.path());
    $location.path(url + roomID);
  };

  var getRoom = function() {
    console.log(currentRoom);
    return currentRoom;
  };

  var getStartTimes = function() {
    return bookedStartTimes;
  };

  var getEndTimes = function() {
    return bookedEndTimes;
  };

  return {
    menus: menus,
    currentRoom: currentRoom,
    viewRoom: viewRoom,
    getRoom: getRoom,
    bookedStartTimes: bookedStartTimes,
    bookedEndTimes: bookedEndTimes,
    reroute: reroute,
    getStartTimes: getStartTimes,
    getEndTimes: getEndTimes
  };

}]);