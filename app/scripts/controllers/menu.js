'use strict';


angular.module('privateTableApp')
  .controller('menuController', ['$scope', 'SearchBar', 'SearchResults', 'roomData', function($scope, SearchBar, SearchResults, roomData) {

    $scope.currentMenu.number = 1;
    $scope.firstMenu = true;
    $scope.lastMenu = false;
    $scope.menus = roomData.menus;
    $this.currentMenu = this.menus[0];

    $scope.prevMenu = function() {
      var prevIndex = currentMenu.number-2;
      this.currentMenu = this.menus[prevIndex];
      $scope.currentMenu.number = prevIndex-1;
    };

    $scope.nextMenu = function() {
      var nextIndex = currentMenu.number+1;
      this.currentMenu = this.menus[prevIndex];
      $scope.currentMenu.number = nextIndex-1;

    };

    $scope.init = function () {
      
    };

    $scope.init();
  }]);
