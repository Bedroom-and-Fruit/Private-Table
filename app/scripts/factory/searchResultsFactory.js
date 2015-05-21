'use strict';

angular.module('searchResultsFactory', [])

.factory('SearchResults', function($http, $location) {
  // Your code here
  var searchParams;
  var getResults = function (information) {
    searchParams = information;
    return $http({
      method: 'GET',
      url: 'http://hn.algolia.com/api/v1/search?tags=front_page',
      data: information
    })
    .then(function (response) {
      $location.path('/dashboard');
      return response.data;
    });
  };


  return {
    getResults: getResults,
    searchParams: searchParams
  };

});