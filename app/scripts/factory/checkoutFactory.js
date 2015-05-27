'use strict';

angular.module('checkoutFactory', [])

.factory('CheckoutOptions', ['$location', function($location) {
  // Your code here
  var eventParams = {};
  var setEventParams = function (params, callback) {
    for (var key in params) {
      eventParams[key] = params[key];
    }
  };

  var getEventParams = function() {
    return eventParams;
  };

  return {
    eventParams: eventParams,
    getEventParams: getEventParams,
    setEventParams: setEventParams
  };

}]);