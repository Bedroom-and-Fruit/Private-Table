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
    'searchResultsFactory'
  ])
  .config(function ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/');

    $stateProvider
      .state('dashboard', {
        url: '/dashboard',
        templateUrl: 'views/dashboard.html'
      })
      .state('landing', {
        url: '/',
        templateUrl: 'views/landing.html'
      })
      .state('about', {
        url:'/about',
        templateUrl: 'views/about.html'
      });
  });
