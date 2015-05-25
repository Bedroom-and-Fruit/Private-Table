'use strict';

angular.module('roomFactory', [])

.factory('roomData', ['SearchResults', '$location', function(SearchResults, $location) {
  var currentRoom = {};
  var menus = [];

  var getRoomData = function(params, callback) {
    var url = 'http://hn.algolia.com/api/v1/search?tags=front_page';
    return $http({
      method: 'GET',
      url: url,
      data: params
    })
    .then(function(response){
      // currentRoom = response.data;
      // menus.splice(0, menus.length);
      // response.data.hits.forEach(function(val){
      //   menus.push(val);
      });
      if (callback) { callback(); }
    });
  };

  return {
    menus: menus,
    currentRoom: currentRoom,
    getRoomData: getRoomData
  };

}]);