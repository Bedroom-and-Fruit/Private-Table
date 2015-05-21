'use strict';

angular.module('searchResultsFactory', [])

.factory('SearchResults', ['$http', '$location', function($http, $location) {
  // Your code here
  var searchParams;
  var searchResults;
  var getResults = function (information) {
    searchParams = information;
    console.log(searchParams);
    return $http({
      method: 'GET',
      url: 'http://hn.algolia.com/api/v1/search?tags=front_page',
      data: information
    })
    .then(function (response) {
      searchResults = response.data;
      $location.path('/dashboard');
      return searchResults;
    });
  };


  return {
    getResults: getResults,
    searchParams: searchParams,
    searchResults: searchResults
  };

}]);