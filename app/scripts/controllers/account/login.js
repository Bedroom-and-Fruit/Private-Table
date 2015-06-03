'use strict';

angular.module('privateTableApp')
  .controller('LoginCtrl', ['$scope', '$rootScope', 'AUTH_EVENTS', 'Auth', function ($scope, $rootScope, AUTH_EVENTS, Auth) {
    $scope.credentials = {};
    $scope.errors = {};


    $scope.login = function (credentials) {
      Auth.login(credentials).then(function (user) {
        $rootScope.$broadcast(AUTH_EVENTS.loginSuccess);
        $scope.setCurrentUser(user);
      }, function () {
        $rootScope.$broadcast(AUTH_EVENTS.loginFailed);
      });
     };

  }]);