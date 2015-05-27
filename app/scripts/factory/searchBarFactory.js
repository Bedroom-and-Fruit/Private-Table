'use strict';

angular.module('searchBarFactory', [])

.factory('SearchBar', ['SearchResults', '$location', 'CheckoutOptions', function(SearchResults, $location, CheckoutOptions) {
  // Your code here
  var searchParams;
  var setSearchParams = function (params, callback) {
    searchParams = params;
    // this is where our previous reroute was
    CheckoutOptions.setEventParams(searchParams);
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
    $('.timepicker').datetimepicker({datepicker:false, format: 'g:i A', formatTime: 'g:i A', step: 30});
    $('#datepicker').datetimepicker({timepicker:false, format: 'm/d/Y', closeOnDateSelect:true});
  };

  return {
    searchParams: searchParams,
    searchFormInit: searchFormInit,
    getSearchParams: getSearchParams,
    setSearchParams: setSearchParams
  };

}]);