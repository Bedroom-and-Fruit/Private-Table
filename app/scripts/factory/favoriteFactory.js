'use strict';

angular.module('favoriteFactory', [])

.factory('Favorites', ['$location', '$http', 'SearchResults', function($location, $http, SearchResults) {
  var favorites = [];

  var getFavorites = function() {
    var url = '/api/users/favorites';
    $http.get(url)
    .success(function(data, status, headers, config) {
      favorites.splice(0, favorites.length);
      data.forEach(function(val){
        favorites.push(val);
      });
    })
    .error(function(data, status, headers, config) {
      console.log(data);
      console.log('There was an error');
    });
  };
    
  var isFavorite = function (room) {
    var result = false;
    favorites.forEach(function(roomInArray) {
      if (roomInArray.roomID === room.roomID) {
        result = true;
      }
    });
    return result;
  };

  var addFavorite = function (room) {
    var url = '/api/users/favorites/addfavorites';
    $http.post(url, {roomID: room})
    .success(function(data, status, headers, config) {
      FavoritesFactory.getFavorites();
    })
    .error(function(data, status, headers, config) {
      console.log(data);
      console.log('There was an error');
    });
  };

  var removeFavorite = function (room) {
    var url = '/api/users/favorites/deletefavorites';
    $http.post(url, {roomID: room})
    .success(function(data, status, headers, config) {
      FavoritesFactory.getFavorites();
    })
    .error(function(data, status, headers, config) {
      console.log(data);
      console.log('There was an error');
    });
  };

  var FavoritesFactory = {
    favorites: favorites,
    removeFavorite: removeFavorite,
    addFavorite: addFavorite,
    isFavorite: isFavorite,
    getFavorites: getFavorites
  };

  return FavoritesFactory;

}]);