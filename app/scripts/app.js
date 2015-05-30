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
    'angularSpinner'
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
        views: {
          '': {templateUrl: 'views/checkout.html'},
          'checkoutbox@checkout': {
            templateUrl: 'views/checkout/checkoutbox.html'
          }
        }
      })
      
      .state('checkout.room', {
        url: '/room',
        templateUrl: 'views/checkout/room.html'
      })

      .state('checkout.menu', {
        url: '/menu',
        templateUrl: 'views/checkout/menu.html'
      })

      .state('payment', {
        url: '/payments',
        templateUrl: 'views/payments.html'
      })
      .state('confirmation', {
        url: '/confirmation',
        templateUrl: 'views/confirmation.html'
      });
  });