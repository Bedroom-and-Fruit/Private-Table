'use strict';

angular.module('privateTableApp')
  .controller('paymentsController', ['$scope', '$location', '$state', '$http','SearchBar', 'roomData', 'SearchResults', function($scope, $location, $state, $http, SearchBar, roomData, SearchResults) {

    $scope.roomData = roomData;
    $scope.SearchBar = SearchBar;
    $scope.SearchResults = SearchResults;
    $scope.stripeCallback = function (code, result) {
      result.email = $scope.email;
      var date = SearchBar.searchParams.date;
      var startTimeConverted = SearchResults.timeConverter(SearchBar.searchParams.startTime);
      var endTimeConverted = SearchResults.timeConverter(SearchBar.searchParams.endTime);
      var startTime = SearchResults.createDate(date, '') + ' '+startTimeConverted+ '+00';
      var endTime = SearchResults.createDate(date, '') + ' '+ endTimeConverted+ '+00';
      var price = (SearchBar.searchParams.guests) * (roomData.checkoutMenu.price);
      var roomID = roomData.currentRoom.id;
      var menuID = roomData.checkoutMenu.id;
      var guests = SearchBar.searchParams.guests;
      var eventType = SearchBar.searchParams.eventType;


      var data = {
        startTime: startTime,
        endTime: endTime,
        price: price,
        roomID: roomID,
        menuID: menuID,
        guests: guests,
        eventType: eventType,
        result: result,
      };
      console.log(data);
      if (result.error) {
          window.alert('Your payment did not go through... Try again!');
      } else {
       var url = 'api/payments';
        return $http({
          method: 'POST',
          url: url,
          data: data, 
        })
        .then(function(response){
          $state.go('checkout.confirmation');
        });
      }
    };

  }]);