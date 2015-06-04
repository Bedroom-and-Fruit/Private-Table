angular.module('privateTableApp')
  .controller('signupController', ['$scope', 'Auth', '$location', function ($scope, Auth, $location) {
    $scope.credentials = {};
    $scope.errors = {};

    $scope.signup = function(form) {
      //$scope.submitted = true;
      if (form) {
        console.log('signing up user');
        Auth.createUser({
          username: $scope.credentials.username,
          email: $scope.credentials.email,
          password: $scope.credentials.password
        })
        .then(function() {
          // Account created, redirect to user's dashboard
          $location.path('/bookings');
          
        })
        .catch(function(err) {
          err = err.data;
          $scope.errors = {};
          });
      } else {
        console.log('Form is not valid');
      }
    };
  }]);

  