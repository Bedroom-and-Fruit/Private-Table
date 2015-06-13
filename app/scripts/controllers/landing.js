'use strict';

angular.module('privateTableApp')
  .controller('landingController', ['$scope', '$location', 'SearchBar', 'SearchResults', function($scope, $location, SearchBar, SearchResults) {

    $scope.SearchBar = SearchBar;

    $scope.submitSearch = function() {
      SearchResults.getSearchResults($scope.SearchBar.searchParams, SearchResults.reroute($scope.SearchBar.searchParams, '/searchbar'), '/searchBar');
    };

    $scope.init = function () {
      SearchBar.searchFormInit();
    };

    $scope.setMinEndTime = function () {
      var minEndTime = SearchBar.endTimeAdjuster($scope.SearchBar.startTime);
      $('#endtimepick').datetimepicker({datepicker:false, format: 'g:i A', formatTime: 'g:i A', step: 30, minTime: minEndTime});
      $('#starttimepick').datetimepicker({datepicker:false, format: 'g:i A', formatTime: 'g:i A', step: 30, minTime: '12:00 AM'});
    };

    $scope.init();
  }]);


      