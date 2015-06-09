'use strict';

angular.module('authInterceptorFactory', [])
  .factory('authInterceptor', ['$rootScope', '$cookies', '$q', '$location', function($rootScope, $cookies, $q, $location) {

    var request = function(config) {
      config.headers = config.headers || {};
      if ($cookies.get('PrivateTableToken')){
        config.headers.Authorization = 'Bearer ' + $cookies.get('PrivateTableToken');
      }
      return config;
    };

    var responseError = function(response) {
      if(response.status === 401) {
        $location.path('/login');
        // remove any stale tokens
        $cookies.remove('PrivateTableToken');
        return $q.reject(response);
      }
      else {
        return $q.reject(response);
      }
    };

    return {

      request: request,
      responseError: responseError

    };

  }]);