'use strict';


angular.module('privateTableApp')
  .controller('navController', ['$scope', '$location', 'SearchResults', 'Auth', function($scope, $location, SearchBar, SearchResults, Auth) {
    //$scope.currentUser = Auth.currentUser;
    $scope.init = function () {};
 
    

    $scope.init();
  }]);