'use strict';

angular.module('privateTableApp')
  .controller('searchBarController', ['$scope', '$location', 'SearchBar', 'SearchResults', '$stateParams', function($scope, $location, SearchBar, SearchResults, $stateParams) {
   
    $scope.SearchBar = SearchBar;

    $scope.newSearch = function() {
      SearchResults.getSearchResults($scope.SearchBar.searchParams);
    };

    $scope.init = function () {
      SearchBar.searchFormInit();
      if ($stateParams) {
        SearchResults.getSearchResults($stateParams);
      } else {
      SearchResults.getSearchResults($scope.SearchBar.searchParams);
      }
      SearchResults.showAll();
    };

    $scope.setMinEndTime = function () {
      
      var minEndTime = SearchBar.endTimeAdjuster($scope.SearchBar.searchParams.startTime);
      $('#endtimepicker').datetimepicker({datepicker:false, format: 'g:i A', formatTime: 'g:i A', step: 30, minTime: minEndTime});
      $('#starttimepicker').datetimepicker({datepicker:false, format: 'g:i A', formatTime: 'g:i A', step: 30, minTime: '12:00 AM'});
    };
    
    $scope.init();
  }]);