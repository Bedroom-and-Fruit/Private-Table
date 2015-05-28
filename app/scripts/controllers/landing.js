'use strict';

angular.module('privateTableApp')
  .controller('landingController', ['$scope', '$location', 'SearchBar', 'SearchResults', function($scope, $location, SearchBar, SearchResults) {
    $scope.params = {};
    $scope.submitSearch = function() {
      //check that all forms are filled before initiating request
      SearchBar.setSearchParams(this.params, SearchResults.reroute);
    };
    $scope.init = function () {
      SearchBar.searchFormInit();
    };

    $scope.setMinEndTime = function () {
      var minEndTime = SearchBar.endTimeAdjuster(this.params.startTime);
      $('#endtime').datetimepicker({datepicker:false, format: 'g:i A', formatTime: 'g:i A', step: 30, minTime: minEndTime});
    };

    $scope.init();
  }]);
