'use strict';

angular.module('roomFactory', [])

.factory('roomData', ['SearchResults', '$location', '$http', function(SearchResults, $location, $http) {
  var currentRoom;
  var roomID;
  var allBookedTimes = [];
  var menus = [];
  var currentMenu;

  var viewRoom = function(room, url, callback, reroute) {
    var toUrl = url + room;
    return $http({
      method: 'GET',
      url: toUrl
    })
    .then(function(response) {
      console.log(response);

      if (response.data.venueName) {
      roomID = response.data.id;
      currentRoom = response.data;
      currentRoom.menuPrices = currentRoom.menuPrices.sort(function(a,b){return a-b;});
      }

      if(response.data.menu) {
        menus.splice(0, menus.length);
        response.data.menu.forEach(function(val){
          menus.push(val);
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


  var findAvailableTimes = function(roomID, url, startTime, endTime, callback) {
    var toUrl = url;
    return $http({
      method: 'GET',
      url: toUrl,
      params: {roomID: roomID, startTime: startTime, endTime: endTime}
    })
    .then(function(response) {
      allBookedTimes.splice(0, allBookedTimes.length);
      response.data.allTimeBlocks.forEach(function(val){
        allBookedTimes.push(val);
      });
      if (callback) {
        callback();
      }
    });
  };

  var reroute = function(url, roomID) {
    if (roomID) {
      $location.url($location.path());
      $location.path(url + roomID);
    } else {
      $location.path(url);
    }
  };

  var getRoom = function() {
    return currentRoom;
  };

  var getAllBookedTimes = function() {
    return allBookedTimes;
  };

  var getMenu = function() {
    return menus;
  };

  var chooseMenu = function(menu) {
    currentMenu = menu;
  };

  return {
    menus: menus,
    currentRoom: currentRoom,
    viewRoom: viewRoom,
    getRoom: getRoom,
    allBookedTimes: allBookedTimes,
    reroute: reroute,
    getAllBookedTimes,
    getMenu: getMenu,
    chooseMenu: chooseMenu,
    currentMenu: currentMenu,
    findAvailableTimes: findAvailableTimes
  };

}]);