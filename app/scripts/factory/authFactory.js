'use strict';

angular.module('authFactory', [])
  .factory('Auth', ['$http','$resource', '$cookies', '$q', function($http, $resource, $cookies, $q) {

    var currentUser = {};

    var loggedIn = false;

    if($cookies.get('PrivateTableToken')) {
      currentUser = $resource('api/users/me').get();
    }

    var login = function(credentials) {
      return $resource('auth/local/').save(credentials, function(data) {
        $cookies.put('PrivateTableToken', data.token);
        //if returned a token, find the user based on that token and set current user to the return value
        AuthFactory.currentUser = $resource('api/users/me').get();
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
        AuthFactory.currentUser = $resource('api/users/me').get();
      },
      function(err) {
        console.log(err);
        console.log('we need to figure out error handling here');
      }.bind(this)).$promise;
    };

    var getUser = function() {
      return AuthFactory.currentUser;
    };

    var logout = function() {
      $cookies.remove('PrivateTableToken');
      AuthFactory.loggedIn = false;
      AuthFactory.currentUser = {};
    };

    var isLoggedInAsync = function(callback) {
      if(AuthFactory.currentUser.hasOwnProperty('$promise')) {
        AuthFactory.currentUser.$promise.then(function() {
          callback(true);
        }).catch(function() {
          callback(false);
        });
      } else {
        callback(false);
      }
    };

    var checkLoggedIn = function() {
      if ($cookies.get('PrivateTableToken')) {
        AuthFactory.loggedIn = true;
      };
    };

    var AuthFactory = {
      login: login,
      logout: logout,
      createUser: createUser,
      currentUser: currentUser,
      getUser: getUser,
      isLoggedInAsync: isLoggedInAsync,
      loggedIn: loggedIn,
      checkLoggedIn: checkLoggedIn
    };

    return AuthFactory;

  }]);