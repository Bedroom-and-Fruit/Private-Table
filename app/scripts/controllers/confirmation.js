'use strict';

angular.module('privateTableApp')
  .controller('paymentsController', ['$scope', '$location', '$http', function($scope, $location, $http) {

    $scope.stripeCallback = function (code, result) {
      if (result.error) {
          window.alert('Your payment failed for some reason...');
      } else {
       var url = 'api/payments';
       var token = result.id;
       return $http({
         method: 'GET',
         url: url,
       })
       .then(function(response){
         console.log(response);
         });
        $location.path('/confirmation');
       });
      }
    };

  }]);