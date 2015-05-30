'use strict';


angular.module('privateTableApp')
  .controller('navController', ['$scope', '$location', 'SearchResults', function($scope, $location, SearchBar, SearchResults) {

    $scope.loggedIn = true;    
    $scope.init = function () {};


    $scope.init();
  }]);