'use strict';

angular.module('checkoutFactory', [])

.factory('CheckoutOptions', ['$location', function($location) {
  // Your code here
  var eventParams = {};
  var menuParams;
  var setEventParams = function (params, callback) {
    for (var key in params) {
      eventParams[key] = params[key];
    }
  };

  var getEventParams = function() {
    return eventParams;
  };

  var setMenuParams = function(menu) {
    menuParams = menu;
  };

  return {
    eventParams: eventParams,
    getEventParams: getEventParams,
    setEventParams: setEventParams,
    setMenuParams: setMenuParams
  };

}]);