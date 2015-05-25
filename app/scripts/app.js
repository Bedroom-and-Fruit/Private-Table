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
    'searchBarFactory',
    'searchResultsFactory'
  ])
  .config(function ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/');

    $stateProvider
      .state('landing', {
        url: '/',
        templateUrl: 'views/landing.html'
      })
      .state('searchBar', {
        url: '/searchbar',
        views: {
          '': {templateUrl: 'views/searchBar.html'},
          'searchResults@searchBar': {
            templateUrl: 'views/searchBar/searchResults.html',
            controller: 'searchResultsController'
          }
        }
      })
      .state('checkout', {
        url: '/checkout',
        templateUrl: 'views/checkout.html'
      })
      .state('checkout.menu', {
        url: '/menu',
        views: {
          '': {templateUrl: 'views/checkout/menu.html'},
          'checkoutbox@checkout.menu': {
            templateUrl: 'views/checkout/checkoutbox.html'
          }
        }
      })
      .state('checkout.room', {
        url: '/room',

        views: {
          '': {templateUrl: 'views/checkout/room.html'},
          'checkoutbox@checkout.room': {
            templateUrl: 'views/checkout/checkoutbox.html'
          }
        }
      });
  });
