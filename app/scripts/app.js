'use strict';
$(document).foundation();
/**
 * @ngdoc overview
 * @name privateTableApp
 * @description
 * # privateTableApp
 *
 * Main module of the application.
 */
angular
  .module('privateTableApp', [
    'ngAnimate',
    'ngAria',
    'ngCookies',
    'ngMessages',
    'ngResource',
    'ngSanitize',
    'ui.router',
    'ngTouch',
    'searchBarFactory'
  ])
  .config(function ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/');

    $stateProvider
      .state('searchBar', {
        url: '/searchbar',
        views: {
          '': {templateUrl: 'views/searchBar.html'},
          'searchResults': {templateUrl: 'views/searchBar/searchResults.html'}
        }
      })
      .state('landing', {
        url: '/',
        templateUrl: 'views/landing.html'
      });
  });
