'use strict';

angular.module('searchBarFactory', [])

.factory('SearchBar', ['SearchResults', '$location', function(SearchResults, $location) {
  // Your code here
  var searchParams;
  var setSearchParams = function (params, callback) {
    searchParams = params;
    // this is where our previous reroute was
    if (callback) {
      SearchResults.getSearchResults(searchParams, callback);
    } else {
      SearchResults.getSearchResults(searchParams);
    }
  };

  var getSearchParams = function() {
    return searchParams;
  };

  var searchFormInit = function () {
    $('#timepicker').datetimepicker({datepicker:false, formatTime: 'g:i A', step: 30});
    $('#datepicker').datetimepicker({timepicker:false, closeOnDateSelect:true});
  };

  return {
    searchParams: searchParams,
    searchFormInit: searchFormInit,
    getSearchParams: getSearchParams,
    setSearchParams: setSearchParams
  };

}]);