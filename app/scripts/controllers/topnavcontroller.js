'use strict';


angular.module('privateTableApp')
  .controller('navController', ['$scope', '$location', 'SearchResults', function($scope, $location, SearchBar, SearchResults) {
    $scope.signupShown = false;
    $scope.loginShown = false;
    $scope.loggedIn = true;    
    $scope.init = function () {};
    $scope.toggleSignUp = function () {
      this.signUpShown = !this.signUpShown;
    }
    $scope.toggleLogin = function () {
      this.loginShown = !this.loginShown;
    }

    $scope.init();
  }]);