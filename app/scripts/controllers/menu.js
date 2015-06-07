'use strict';


angular.module('privateTableApp')
  .controller('menuController', ['$scope', 'SearchBar', 'SearchResults', 'roomData', function($scope, SearchBar, SearchResults, roomData) {


    $scope.firstMenu = true;
    $scope.lastMenu = false;
    $scope.menus = roomData.menus || [];
    $scope.currentMenu = $scope.menus[0] || {};
    $scope.currentMenu.number = 1;

    $scope.prevMenu = function() {
      var prevIndex = currentMenu.number-2;
      this.currentMenu = this.menus[prevIndex];
      this.currentMenu.number++;
    };

    $scope.nextMenu = function() {
      var nextIndex = currentMenu.number+1;
      this.currentMenu = this.menus[prevIndex];
      $scope.currentMenu.number--;
    };

    $scope.chooseMenu = function() {
      roomData.chooseMenu($scope.currentMenu);
    };

    $scope.init = function () {
      
    };

    $scope.init();
  }]);
