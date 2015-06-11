angular.module('privateTableApp')
  .controller('bookingsController', ['$scope', 'Bookings', function($scope, Bookings) {
    //This controller determines how the ngRepeat in searchResults view is filtered.
    $scope.Bookings = Bookings;
    $scope.detailsReveal = false;

    $scope.showDetails = function(booking) {
      $scope.Bookings.currentBooking = booking;
      $scope.detailsReveal = true;
    };

    $scope.init = function () {
      Bookings.getAllBookings();
    };

    $scope.init();
  }]);