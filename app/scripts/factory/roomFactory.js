'use strict';

angular.module('roomFactory', [])

.factory('roomData', ['SearchResults', '$location', '$http', function(SearchResults, $location, $http) {
  var currentRoom;
  var roomID;
  var allBookedTimes = [];
  var menus = [];
  var currentMenu;
  var checkoutMenu = {};
  checkoutMenu.price = 0;

  var viewRoom = function(room, url, callback, reroute) {
    var toUrl = url + room;
    return $http({
      method: 'GET',
      url: toUrl
    })
    .then(function(response) {
      roomID = response.data.id;
      roomFactory.currentRoom = response.data;
      roomFactory.currentRoom.menuPrices = roomFactory.currentRoom.menuPrices.sort(function(a,b){return a-b;});
      
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
      roomFactory.allBookedTimes.splice(0, roomFactory.allBookedTimes.length);
      response.data.allTimeBlocks.forEach(function(val){
        roomFactory.allBookedTimes.push(val);
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
    return roomFactory.currentRoom;
  };

  var getAllBookedTimes = function() {
    return roomFactory.allBookedTimes;
  };

  var getCurrentMenu = function() {
    return roomFactory.currentMenu;
  };

  var chooseMenu = function(menu) {
    roomFactory.checkoutMenu = menu;
  };
  
  var viewMenus = function(room, eventType, callback) {
    var url = 'api/menu/eventType';
    return $http({
      method: 'GET',
      url: url,
      params: {roomID: room, eventType: eventType}
    })
    .then(function(response){
      roomFactory.menus.splice(0, roomFactory.menus.length);
      response.data.forEach(function(menu) {
        roomFactory.menus.push(menu);
      }); 
      roomFactory.viewCourses(roomFactory.menus[0].id);   
       if (callback) {
        callback();
      }
      });
  };

  var viewCourses = function(menuID, callback) {
  var url = 'api/menu/menuID?';
  return $http({
    method: 'GET',
    url: url,
    params: {menuID: menuID}
  })
  .then(function(response){
    roomFactory.currentMenu = response.data;
    if (callback) {
      callback();
    }
    });
  };

  var roomFactory = {
    menus: menus,
    viewCourses: viewCourses,
    viewMenus: viewMenus,
    currentRoom: currentRoom,
    viewRoom: viewRoom,
    getRoom: getRoom,
    allBookedTimes: allBookedTimes,
    reroute: reroute,
    getAllBookedTimes: getAllBookedTimes,
    getCurrentMenu: getCurrentMenu,
    chooseMenu: chooseMenu,
    currentMenu: currentMenu,
    findAvailableTimes: findAvailableTimes,
    checkoutMenu: checkoutMenu
  };

  return roomFactory;

}]);