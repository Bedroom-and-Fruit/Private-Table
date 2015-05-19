'use strict';

/**
 * @ngdoc function
 * @name privateTableApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the privateTableApp
 */
angular.module('privateTableApp')
  .controller('AboutCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
