angular.module('privateTableApp')

  .controller('bookingsController', ['$scope', 'Bookings', function($scope, Bookings) {
    //This controller determines how the ngRepeat in searchResults view is filtered.
    $scope.Bookings = Bookings;
  
    $scope.init = function () {
      Bookings.getAllBookings();
    };

    $scope.init();
  }]);