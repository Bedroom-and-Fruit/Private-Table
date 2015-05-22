'use strict';

angular.module('searchResultsFactory', [])

.factory('SearchResults', ['$location', '$http', function($location, $http) {

  var searchResults = [];
  var getSearchResults = function(params, callback) {
    var url = 'http://hn.algolia.com/api/v1/search?tags=front_page';
    return $http({
      method: 'GET',
      url: url,
      data: params
    })
    .then(function(response){
      searchResults.splice(0, searchResults.length);
      response.data.hits.forEach(function(val){
        searchResults.push(val);
      });
      if (callback) { callback(); }
    });
  };

  var reroute = function() {
    $location.path('/searchbar');
  };

  return {
    searchResults: searchResults,
    getSearchResults: getSearchResults,
    reroute: reroute
  };

}]);
