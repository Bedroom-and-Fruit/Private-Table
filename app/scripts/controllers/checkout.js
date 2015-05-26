'use strict';

angular.module('privateTableApp')
  .controller('checkoutController', ['$scope', '$location', 'SearchBar', 'SearchResults', '$http', function($scope, $location, SearchBar, SearchResults, $http) {
    $scope.data = [{hello: 'no'}, {hello: 'yes'}, {hello: 'huh'}];
    $scope.selectedVenue = {roomName: 'Sophia Room', time: 'November 5, 2015'};

    $scope.toMenu = function() {
      $location.path('/checkout/menu');
      var url = 'http://hn.algolia.com/api/v1/search?tags=front_page';
      return $http({
        method: 'GET',
        url: url
      })
      .then(function(response){
        $('.changepadding').hide();
        });
        if (callback) { callback(); }
      };

    $scope.dateInit = function() {
      SearchBar.searchFormInit();
    };

    $scope.dateInit();

  }]);
