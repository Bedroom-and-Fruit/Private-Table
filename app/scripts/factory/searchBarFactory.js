'use strict';

angular.module('searchBarFactory', [])

.factory('SearchBar', ['SearchResults', '$location', 'CheckoutOptions', '$state', function(SearchResults, $location, CheckoutOptions, $state) {
  // Your code here
  var searchParams;

  var searchFormInit = function () {
    $('.timepicker').datetimepicker({datepicker:false, format: 'g:i A', formatTime: 'g:i A', step: 30});
    $('#datepicker').datetimepicker({timepicker:false, format: 'm/d/Y', closeOnDateSelect:true, minDate:0});
  };

  var endTimeAdjuster = function (time, hours) {
    hours = hours ? hours : 1;
    var amPmSwitch = function (minAmPm) {
      minAmPm.split(" ");
      if (minAmPm[1].indexOf('AM') > -1) {
        minAmPm[1] = 'PM';
      } else {
        minAmPm[1] = 'AM';
      }
      minAmPm.join(" ");
    };
    var hhMmA= time.split(':');
    hhMmA[0] = parseInt(hhMmA[0])+1;
    if (hhMmA[0] > 12) {
      hhMmA[0] -= 11;
      hhMmA[1] = amPmSwitch(hhMmA[1]);
    }
    if (hhMmA[0] === 12) {
      hhMmA[1] = amPmSwitch(hhMmA[1]);
    }
    return hhMmA.join(":");
  };
    
  var searchBarFactory = {
    endTimeAdjuster: endTimeAdjuster,
    searchParams: searchParams,
    searchFormInit: searchFormInit
  };

  return searchBarFactory;

}]);