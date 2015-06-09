'use strict';

angular.module('favoriteFactory', [])

.factory('Favorites', ['$location', '$http', 'SearchResults', function($location, $http, SearchResults) {
  var favorites = [];

  var getFavorites = function() {
    return SearchResults.getResults(params, reroute, 'api/favoriteResults', '/favorites', favorites);
  };
    
  var isFavorite = function (room) {
    if (FavoritesFactory.favorites.contains(room)) {
      return true;
    } else {
      return false;
    }
  };

  var addFavorite = function (room) {
    var url = '/api/users/addfavorites';
    $http.post(url, {roomID: room.roomID})
    .success(function(data, status, headers, config) {
      console.log(data);
      FavoritesFactory.favorites.push(room);
    })
    .error(function(data, status, headers, config) {
      console.log(data);
      console.log('There was an error');
    });
  };

  var removeFavorite = function (room) {
    var url = '/api/users/deletefavorites';
    $http.post(url, {roomID: room.roomID})
    .success(function(data, status, headers, config) {
      FavoritesFactory.favorites.splice(room,1);
    })
    .error(function(data, status, headers, config) {
      console.log(data);
      console.log('There was an error');
    });
  };

  var FavoritesFactory = {
    removeFavorite: removeFavorite,
    addFavorite: addFavorite,
    isFavorite: isFavorite,
    getFavorites: getFavorites
  };

  return FavoritesFactory;

}]);