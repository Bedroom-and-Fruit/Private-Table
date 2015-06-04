'use strict';

angular.module('authFactory', [])
  .factory('Auth', ['$http','$resource', '$cookies', function($http, $resource, $cookies) {

    var currentUser = {};

    var login = function(credentials) {
      var User = $resource('auth/local/');
      return User.save(credentials, function(data) {
        $cookies.put('PrivateTableToken', data.token);
        currentUser = $resource('api/users/me').get();
      },
      function(err) {
        console.log(err);
        console.log('we need to figure out error handling here');
      }.bind(this)).$promise;
    };

    var createUser = function(credentials) {
      var User = $resource('api/users/');
      return User.save(credentials, function(data) {
        $cookies.put('PrivateTableToken', data.token);
        currentUser = $resource('api/users/me').get();
      },
      function(err) {
        console.log(err);
        console.log('we need to figure out error handling here');
      }.bind(this)).$promise;
    };

    return {

      login: login,
      createUser: createUser

    };

  }]);

// var User = $resource('/user/:userId', {userId:'@id'});
// var user = User.get({userId:123}, function() {
//   user.abc = true;
//   user.$save();
// });