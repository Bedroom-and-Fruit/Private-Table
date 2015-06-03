'use strict';

angular.module('privateTableApp')

.controller('ApplicationCtrl', [ '$scope', 'USER_ROLES', 'Auth', function ($scope, USER_ROLES, Auth) {
  $scope.currentUser = null;
  $scope.userRoles = USER_ROLES;
  $scope.isAuthorized = AuthService.isAuthorized;
 
  $scope.setCurrentUser = function (user) {
    $scope.currentUser = user;
  };
}])