'use strict';


angular.module('privateTableApp')
  .controller('menuController', ['$scope', 'SearchBar', 'SearchResults', 'roomData', function($scope, SearchBar, SearchResults, roomData) {


    $scope.firstMenu = true;
    $scope.lastMenu = false;
    $scope.menus = roomData.menus;
    $scope.menuNumber = 0;
    $scope.menuTitle = $scope.menus[$scope.menuNumber].name;
    $scope.checkoutMenu = roomData;

    $scope.prevMenu = function() {
      $scope.menuNumber --;
      roomData.viewCourses($scope.menus[$scope.menuNumber].id, function() {
        $scope.currentMenu = roomData.getCurrentMenu();
        $scope.menuTitle = $scope.menus[$scope.menuNumber].name;
        $scope.lastMenu = false;
        if ($scope.menuNumber === 0) {
          $scope.firstMenu = true;
        }
      });
    };

    $scope.nextMenu = function() {
      $scope.menuNumber ++;
      roomData.viewCourses($scope.menus[$scope.menuNumber].id, function() {
        $scope.currentMenu = roomData.getCurrentMenu();
        $scope.menuTitle = $scope.menus[$scope.menuNumber].name;
        $scope.firstMenu = false;
        if ($scope.menuNumber === $scope.menus.length-1) {
          $scope.lastMenu = true;
        }
      });
    };

    $scope.chooseMenu = function() {
      var menuOfMenuNumber = $scope.menus[$scope.menuNumber];
      roomData.chooseMenu(menuOfMenuNumber);
    };

    $scope.init = function () {
      $scope.currentMenu = roomData.getCurrentMenu();
    };

    $scope.init();
  }]);
