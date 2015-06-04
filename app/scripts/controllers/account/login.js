'use strict';

angular.module('privateTableApp')
  .controller('loginController', function ($scope, Auth, $location) {
    $scope.credentials = {};
    $scope.errors = {};
    $scope.loginShown = false;
    $scope.toggleLogin = function () {
      this.loginShown = !this.loginShown;
    };
    $scope.login = function(form) {

      if(form) {
        Auth.login({
          username: $scope.credentials.username,
          password: $scope.credentials.password
        })
        .then(function() {
          // Logged in, redirect to user's dashboard
          $scope.toggleLogin();
          $location.path('/bookings');
        })
        .catch(function(err) {
          $scope.errors.other = err.message;
        });
      }
    };
  });