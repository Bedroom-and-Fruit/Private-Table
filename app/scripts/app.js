'use strict';
$(document).foundation();
(function() {
    Stripe.setPublishableKey('pk_test_rT3gR317GZZ9QOG0D5uMaQWy');
})();
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
    'searchResultsFactory',
    'roomFactory',
    'checkoutFactory',
    'angularPayments',
    'mm.foundation',
    'angularSpinner',
    'ngModal'
  ])
  .config(function ($stateProvider, $urlRouterProvider, $locationProvider) {
    $urlRouterProvider.otherwise('/');

    $stateProvider
      .state('landing', {
        url: '/',
        templateUrl: 'views/landing.html'
      })
      .state('searchBar', {
        url: '/searchbar?startTimeStamp&endTimeStamp&lng&lat&city&state&country&guests&budget',
        params: {
          city: 'San Francisco'
        },
        views: {
          '': {templateUrl: 'views/searchBar.html'},
          'searchResults@searchBar': {
            templateUrl: 'views/searchBar/searchResults.html',
            controller: 'searchResultsController'
          }
        }
      })
      .state('favorites', {
        url: '/favorites',
        views: {
          '': {templateUrl: 'views/favorites.html'},
          'searchResults@favorites': {
            templateUrl: 'views/searchBar/searchResults.html',
            controller: 'searchResultsController'
          }
        }
      })
      .state('bookings', {
        url: '/bookings',
        views: {
          '': {templateUrl: 'views/bookings.html'},
          'searchResults@bookings': {
            templateUrl: 'views/searchBar/searchResults.html',
            controller: 'searchResultsController'
          }
        }
      })
      .state('checkout', {
        url: '/checkout',
        views: {
          '': {templateUrl: 'views/checkout.html'},
          'checkoutbox@checkout': {
            templateUrl: 'views/checkout/checkoutbox.html'
          }
        }
      })
      .state('checkout.room', {
        url: '/room/:roomID',
        templateUrl: 'views/checkout/room.html'
      })

      .state('checkout.menu', {
        url: '/menu',
        templateUrl: 'views/checkout/menu.html'
      })

      .state('checkout.payment', {
        url: '/payments',
        templateUrl: 'views/checkout/payments.html'
      })
      .state('confirmation', {
        url: '/confirmation',
        templateUrl: 'views/confirmation.html'
      });

      // $locationProvider.html5Mode(true).hashPrefix('!');
  });