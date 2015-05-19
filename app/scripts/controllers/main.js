'use strict';

/**
 * @ngdoc function
 * @name privateTableApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the privateTableApp
 */
angular.module('privateTableApp')
  .controller('MainCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
