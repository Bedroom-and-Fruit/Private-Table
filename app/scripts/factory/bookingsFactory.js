'use strict';

angular.module('bookingsFactory', [])

.factory('Bookings', ['$http', function($http) {
  var bookings = [];
  var currentBooking;

  var getAllBookings = function() {
    var url = '/api/users/bookings';
    $http.get(url)
    .success(function(data, status, headers, config) {
      bookings.splice(0, bookings.length);
      data.forEach(function(val){
        bookings.push(val);
      });
    })
    .error(function(data, status, headers, config) {
      console.log(data);
      console.log('There was an error');
    });
  };   

  var BookingsFactory = {
    bookings: bookings,
    getAllBookings: getAllBookings,
    currentBooking: currentBooking
  };

  return BookingsFactory;

}]);