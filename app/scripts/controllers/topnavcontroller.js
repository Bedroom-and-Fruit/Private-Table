'use strict';


angular.module('privateTableApp')
  .controller('navController', ['$scope', '$location', 'SearchBar', 'Auth', '$state', 'SearchResults', function($scope, $location, SearchBar, Auth, $state, SearchResults) {
    $scope.currentUser; 
    $scope.Auth = Auth;
    $scope.SearchBar = SearchBar;
    $scope.$state = $state;

    
    $scope.init = function () {
      $scope.SearchResults = Auth.getUser();
    };

    $scope.backToSearch = function()  {
      $state.go('searchBar', $scope.SearchBar.searchParams);
    };

    //login
    $scope.loginCredentials = {};
    $scope.errors = {};
    $scope.loginShown = false;

    $scope.toggleLogin = function () {
      $scope.loginShown = !$scope.loginShown;
    };
    $scope.login = function(form) {

      if(form) {
        Auth.login({
          username: $scope.loginCredentials.username,
          password: $scope.loginCredentials.password
        })
        .then(function() {
          // Logged in, redirect to user's dashboard
          $scope.currentUser = Auth.getUser();
          $scope.toggleLogin();
          $scope.Auth.loggedIn = true;
        })
        .catch(function(err) {
          $scope.errors.other = err.message;
        });
      }
    };

    //signup
    $scope.signupCredentials = {};
    $scope.errors = {};
    $scope.signUpShown = false;
    $scope.toggleSignUp = function () {
      $scope.signUpShown = !$scope.signUpShown;
    };

    $scope.signup = function(form) {
      if (form) {
        Auth.createUser({
          username: $scope.signupCredentials.username,
          email: $scope.signupCredentials.email,
          password: $scope.signupCredentials.password
        })
        .then(function() {
          // Account created, redirect to user's dashboard
          $scope.currentUser = Auth.getUser();
          $scope.toggleSignUp();
          $scope.Auth.loggedIn = true;
          
        })
        .catch(function(err) {
          err = err.data;
          $scope.errors = {};
          });
      } else {
        console.log('Form is not valid');
      }
    };

    $scope.logout = function () {
      Auth.logout();
      $scope.currentUser = Auth.getUser();
      $state.go('landing');
    }
    $scope.init();
  }]);