'use strict';

angular.module('searchBarFactory', [])

.factory('SearchBar', ['$http', '$location', function($http, $location) {
  // Your code here
  var searchParams;
  var searchResults;
  var setSearchParams = function (information) {
    searchParams = information;
    // return $http({
    //   method: 'GET',
    //   url: 'http://hn.algolia.com/api/v1/search?tags=front_page',
    //   data: information
    // })
    // .then(function (response) {
    //   searchResults = response.data;
    //move this into dashboard subview controller
    $location.path('/searchbar');
    //   return searchResults;
    // });
  };

  var getSearchParams = function() {
    return searchParams;
  }

  var searchFormInit = function () {
    $('#timepicker').datetimepicker({datepicker:false, formatTime: 'g:i A', step: 30});
    $('#datepicker').datetimepicker({timepicker:false, closeOnDateSelect:true});
  };

  return {
    // getResults: getResults,
    searchParams: searchParams,
    searchResults: searchResults,
    searchFormInit: searchFormInit,
    getSearchParams: getSearchParams,
    setSearchParams: setSearchParams
  };

}]);