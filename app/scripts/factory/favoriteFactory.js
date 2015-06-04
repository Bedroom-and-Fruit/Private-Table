'use strict';

angular.module('favoriteFactory', [])

.factory('Favorites', ['$location', '$http', 'SearchResults', function($location, $http, SearchResults) {
  var favorites = [];

  var getFavorites = function(params) {
    return SearchResults.getResults(params, reroute, 'api/favoriteResults', '/favorites', favorites);
  };
    
  var isFavorite = function (room) {
    if (favorites.contains(room)) {
      return true;
    } else {
      return false;
    }
  };

  var addFavorite = function (room) {
    if (!isFavorite(room)){    
      favorites.push(room);
    }    
    //make call to add favorite from database.
  };

  var removeFavorite = function (room) {
    favorites.splice(room,1);
    //make call to remove favorite from database.
  };

  return {
    removeFavorite: removeFavorite,
    addFavorite: addFavorite,
    isFavorite: isFavorite,
    getFavorites: getFavorites
  };

}]);