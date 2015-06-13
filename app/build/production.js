'use strict';
$(document).foundation();
(function() {
    Stripe.setPublishableKey('pk_test_rT3gR317GZZ9QOG0D5uMaQWy');
})();
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
    'ngAria',
    'ngCookies',
    'ngMessages',
    'ngResource',
    'ngSanitize',
    'ui.router',
    'ngTouch',
    'searchBarFactory',
    'searchResultsFactory',
    'roomFactory',
    'checkoutFactory',
    'angularPayments',
    'mm.foundation',
    'ngModal',
    'authFactory',
    'favoriteFactory',
    'authInterceptorFactory',
    'bookingsFactory'
  ])
  .config(function ($stateProvider, $urlRouterProvider, $locationProvider, $httpProvider) {
    $urlRouterProvider.otherwise('/');

    $httpProvider.interceptors.push('authInterceptor');

    $stateProvider
      .state('landing', {
        url: '/',
        templateUrl: 'views/landing.html'
      })
      .state('searchBar', {
        url: '/searchbar?startTimeStamp&endTimeStamp&lng&lat&city&state&country&guests&budget',
        views: {
          '': {templateUrl: 'views/searchBar.html'},
          'searchResults@searchBar': {
            templateUrl: 'views/searchBar/searchResults.html',
            controller: 'searchResultsController'
          }
        }
      })
      .state('bookings', {
        url: '/bookings',
        views: {
          '': {templateUrl: 'views/bookings.html'},
          'searchResults@bookings': {
            templateUrl: 'views/searchBar/searchResults.html',
            controller: 'searchResultsController',
            authenticate: true
          }
        },
        authenticate: true
      })

      .state('favorites', {
        url: '/favorites',
        templateUrl: 'views/favorites.html',
        controller: 'favoritesController',
        authenticate: true
      })
      
      .state('checkout', {
        url: '/checkout',
        abstract: true,
        views: {
          '': {
            templateUrl: 'views/checkout.html'
          },
          'checkoutbox@checkout': {
            templateUrl: 'views/checkout/checkoutbox.html'
          }
        }
      })
      .state('checkout.room', {
        url: '/room/:roomID',
        templateUrl: 'views/checkout/room.html'
      })

      .state('checkout.menu', {
        url: '/menu',
        templateUrl: 'views/checkout/menu.html'
      })

      .state('checkout.payment', {
        url: '/payments',
        templateUrl: 'views/checkout/payments.html'
      })
      .state('checkout.confirmation', {
        url: '/confirmation',
        templateUrl: 'views/checkout/confirmation.html'
      });

    })
    .run(function ($rootScope, $location, Auth) {
     // Redirect to login if route requires auth and you're not logged in
      $rootScope.$on('$stateChangeStart', function (event, toState) {
        Auth.isLoggedInAsync(function(loggedIn) {
          if (toState.authenticate && !loggedIn) {
            $rootScope.returnToState = toState.url;
            $location.path('/');
          }
        });
      });
      // $rootScope.$on('$stateChangeError', function (event, toState, toParams, fromState, fromParams, error) {
      // });
    });
      // $locationProvider.html5Mode(true).hashPrefix('!');

angular.module('privateTableApp')

  .controller('bookingsController', ['$scope', 'Bookings', function($scope, Bookings) {
    //This controller determines how the ngRepeat in searchResults view is filtered.
    $scope.Bookings = Bookings;
  
    $scope.init = function () {
      Bookings.getAllBookings();
    };

    $scope.init();
  }]);
'use strict';

angular.module('privateTableApp')
  .controller('checkoutController', ['$scope', '$location', 'SearchBar', 'SearchResults', 'CheckoutOptions', '$http', 'roomData', '$stateParams', 'Auth', function($scope, $location, SearchBar, SearchResults, CheckoutOptions, $http, roomData, $stateParams, Auth) {
    $scope.params = SearchBar;
    $scope.room;
    $scope.allBookedTimes;
    $scope.eventConfirmed = false;
    $scope.menuConfirmed = true;
    $scope.menuLabel = true;
    $scope.showSummary = true;
    $scope.available = false;
    $scope.menuFinal = true;
    $scope.checkoutMenu = roomData;
    $scope.Auth = Auth;
    $scope.roomData = roomData;

    $scope.toMenu = function() {
      // CheckoutOptions.setEventParams($scope.params);
      // $scope.params = CheckoutOptions.getEventParams();
      $scope.eventConfirmed = true;
      $scope.menuLabel = false;
      $scope.menuConfirmed = false;
      $('#roomtab').removeClass('active');
      $('#menutab').addClass('active');
      roomData.reroute('/checkout/menu');
    };

    $scope.toRoom = function () {
      $('#roomtab').addClass('active');
      $('#menutab').removeClass('active');
      roomData.reroute('/checkout/room/'+$scope.room.id);
    };

    $scope.toPay = function() {
      $('.active').removeClass('active');
      // CheckoutOptions.setMenuParams(roomData.currentMenu);
      $location.path('/checkout/payments');
      $scope.menuName = true;
      $scope.menuFinal = false;
      $scope.menuConfirmed = true;
      $scope.showSummary = false;
    };
        //also reveal menu panel

    $scope.dateInit = function() {
      SearchBar.searchFormInit();
      // $scope.params = CheckoutOptions.getEventParams();
      if (typeof parseInt($stateParams.roomID) === 'number') {
        roomData.viewRoom($stateParams.roomID, 'api/room/', function() {
          $scope.room = roomData.getRoom();
          $scope.allBookedTimes = roomData.getAllBookedTimes();
        }, roomData.reroute('/checkout/room/', $stateParams.roomID));
      }
      $scope.room = roomData.getRoom();
      $scope.allBookedTimes = roomData.getAllBookedTimes();
    };

    $scope.dateSearch = function() {
      var startTimeStamp = "";
      var endTimeStamp = "";
      //time format: YYYY-MM-DD HH:MM:SS
      startTimeStamp = SearchResults.createDate($scope.params.searchParams.date, startTimeStamp);
      endTimeStamp = SearchResults.createDate($scope.params.searchParams.date, endTimeStamp);
      startTimeStamp +=' 00:00:00';
      endTimeStamp +=' 23:59:59';
      roomData.findAvailableTimes($scope.room.id, 'api/dates', startTimeStamp, endTimeStamp, function() {
        $scope.allBookedTimes = roomData.getAllBookedTimes();
        if ($scope.params.searchParams.endTime && $scope.params.searchParams.startTime) {
          $scope.checkTime($scope.params.searchParams.startTime, $scope.params.searchParams.endTime);
        }
      });
      
    };

    $scope.checkTime = function(start, end) {
      if (start && end) {
        var convertedStartTime = SearchResults.timeConverter(start);
        var convertedEndTime = SearchResults.timeConverter(end);
        var available = false;
        $scope.allBookedTimes.forEach(function(times){
          var startTime = SearchResults.dbTimeConverter(times.start);
          var endTime = SearchResults.dbTimeConverter(times.end);
          if (((convertedStartTime >= startTime) && (convertedStartTime <= endTime)) ||
            ((convertedEndTime >= startTime) && (convertedEndTime <= endTime))) {
            available = true;
          }
        });
        $scope.available = available;
      }
    };

    $scope.setMinEndTime = function () {
      var minEndTime = SearchBar.endTimeAdjuster($scope.params.searchParams.startTime);
      $('#eventend').datetimepicker({datepicker:false, format: 'g:i A', formatTime: 'g:i A', step: 30, minTime: minEndTime});
    };

    $scope.dateInit();
    $scope.Auth.checkLoggedIn();

  }]);

'use strict';

angular.module('privateTableApp')
  .controller('favoritesController', ['$scope','Favorites','roomData', 'Auth', '$cookies', function($scope, Favorites, roomData, Auth, $cookies) {
    $scope.Favorites = Favorites;
    $scope.roomData = roomData;
    $scope.Auth = Auth;

    $scope.viewRoom = function(room) {
      roomData.viewRoom(room.roomID, 'api/room/', null, roomData.reroute('/checkout/room/', room.roomID));
    };

    $scope.init = function () {
      Favorites.getFavorites();
      Auth.checkLoggedIn();
    };

    $scope.init();
  }]);
'use strict';

angular.module('privateTableApp')
  .controller('landingController', ['$scope', '$location', 'SearchBar', 'SearchResults', '$state', function($scope, $location, SearchBar, SearchResults, $state) {
    $scope.params = {};
    $scope.submitSearch = function() {
      //check that all forms are filled before initiating request
      SearchBar.setSearchParams($scope.params, SearchResults.reroute, '/searchbar');
    };
    $scope.init = function () {
      SearchBar.searchFormInit();
    };

    $scope.setMinEndTime = function () {
      
      var minEndTime = SearchBar.endTimeAdjuster($scope.params.startTime);
      console.log('THIS IS MINEND', minEndTime);
      $('#endtimepick').datetimepicker({datepicker:false, format: 'g:i A', formatTime: 'g:i A', step: 30, minTime: minEndTime});
      $('#starttimepick').datetimepicker({datepicker:false, format: 'g:i A', formatTime: 'g:i A', step: 30, minTime: '12:00 AM'});
    };

    $scope.init();
  }]);


      
'use strict';


angular.module('privateTableApp')
  .controller('menuController', ['$scope', 'SearchBar', 'SearchResults', 'roomData', function($scope, SearchBar, SearchResults, roomData) {


    $scope.firstMenu = true;
    $scope.lastMenu = false;
    $scope.menus = roomData.menus;
    $scope.menuNumber = 0;
    $scope.menuTitle = $scope.menus[$scope.menuNumber].name;
    $scope.checkoutMenu = roomData;

    $scope.prevMenu = function() {
      $scope.menuNumber --;
      roomData.viewCourses($scope.menus[$scope.menuNumber].id, function() {
        $scope.currentMenu = roomData.getCurrentMenu();
        $scope.menuTitle = $scope.menus[$scope.menuNumber].name;
        $scope.lastMenu = false;
        if ($scope.menuNumber === 0) {
          $scope.firstMenu = true;
        }
      });
    };

    $scope.nextMenu = function() {
      $scope.menuNumber ++;
      roomData.viewCourses($scope.menus[$scope.menuNumber].id, function() {
        $scope.currentMenu = roomData.getCurrentMenu();
        $scope.menuTitle = $scope.menus[$scope.menuNumber].name;
        $scope.firstMenu = false;
        if ($scope.menuNumber === $scope.menus.length-1) {
          $scope.lastMenu = true;
        }
      });
    };

    $scope.chooseMenu = function() {
      var menuOfMenuNumber = $scope.menus[$scope.menuNumber];
      roomData.chooseMenu(menuOfMenuNumber);
    };

    $scope.init = function () {
      $scope.currentMenu = roomData.getCurrentMenu();
    };

    $scope.init();
  }]);

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
'use strict';


angular.module('privateTableApp')
  .controller('roomController', ['$scope', 'SearchBar', 'SearchResults', 'roomData', '$stateParams', '$state', function($scope, SearchBar, SearchResults, roomData, $stateParams, $state) {

    $scope.room = roomData.currentRoom;
    $scope.amenityMore = true;
    $scope.feeMore = true;
    $scope.roomID = $stateParams;
    $scope.SearchBar = SearchBar;
    $scope.searchParams = SearchBar.getSearchParams();

    //FEES View Limit & Full Display methods/properties
    $scope.feeLimit = 4;
    //$scope.fees = $scope.room.fees;
    $scope.feeMoreClick = function () {
      this.liftLimit(this.feeLimit, this.fees, 'feeMore');
    };

    $scope.toBookings = function() {
      $state.go('bookings');
    };
    //AMENITIES View Limit & Full Display methods/properties
    //$scope.amenities = $scope.room.amenities;
    $scope.amenityLimit = 4;
    $scope.amenityMoreClick = function () {
      this.liftLimit(this.amenityLimit, this.amenities, 'amenityMore');
    }; 

    $scope.liftLimit = function (limit, list, more) {
      //when lists of amenities and fees are available, uncomment below
      //limit = list.length;
      $scope[more] = false;

    };

    $scope.init = function () {
      SearchBar.searchFormInit();
      if (typeof parseInt($stateParams.roomID) === 'number') {
        roomData.viewRoom($stateParams.roomID, 'api/room/', function() {
          $scope.room = roomData.getRoom();
        }, roomData.reroute('/checkout/room/', $stateParams.roomID));
      }
      $scope.room = roomData.getRoom();
      if ($scope.searchParams) {
        if ($scope.searchParams.eventType) {
          roomData.viewMenus($stateParams.roomID, $scope.searchParams.eventType);
        } else {
          roomData.viewMenus($stateParams.roomID);
        }
      } else {
        roomData.viewMenus($stateParams.roomID);
      }
    };
    $scope.init();
  }]);

'use strict';

angular.module('privateTableApp')
  .controller('searchBarController', ['$scope', '$location', 'SearchBar', 'SearchResults', '$stateParams', function($scope, $location, SearchBar, SearchResults, $stateParams) {
   
    $scope.params;

    $scope.newSearch = function() {
      SearchBar.setSearchParams(this.params);
    };

    $scope.init = function () {
      SearchBar.searchFormInit();
      if ($stateParams) {
        SearchResults.getResults($stateParams, 'api/searchresults');
      }
      $scope.params = SearchBar.getSearchParams();
      SearchResults.showAll();
    };

    $scope.setMinEndTime = function () {
      
      var minEndTime = SearchBar.endTimeAdjuster($scope.params.startTime);
      console.log('THIS IS MINEND', minEndTime);
      $('#endtimepicker').datetimepicker({datepicker:false, format: 'g:i A', formatTime: 'g:i A', step: 30, minTime: minEndTime});
      $('#starttimepicker').datetimepicker({datepicker:false, format: 'g:i A', formatTime: 'g:i A', step: 30, minTime: '12:00 AM'});
    };
    
    $scope.init();
  }]);
'use strict';

angular.module('privateTableApp')
  .controller('searchResultsController', ['$scope', '$http','$location', 'SearchResults', 'roomData', '$cookies', 'Auth', 'Favorites', '$state', function($scope, $http, $location, SearchResults, roomData, $cookies, Auth, Favorites, $state) {
    $scope.roomResults = SearchResults.searchResults;
    $scope.Auth = Auth;
    $scope.Favorites = Favorites;

    $scope.bookingType = function (room) {
     return (SearchResults.bookingsSelection(room)) ?  true : false;
    };

    $scope.viewRoom = function (room) {
      roomData.viewRoom(room.roomID, 'api/room/', null, roomData.reroute('/checkout/room/', room.roomID));
    };

    $scope.addFavorite = function(room) {
      Favorites.addFavorite(room.roomID);
    };

    $scope.removeFavorite = function(room) {
      Favorites.removeFavorite(room.roomID);
    };

    $scope.init = function() {
      Auth.checkLoggedIn();
      if ($scope.Auth.loggedIn) {
        $scope.Favorites.getFavorites();
      }
    };

    $scope.init();

  }]);
'use strict';


angular.module('privateTableApp')
  .controller('navController', ['$scope', '$location', 'SearchBar', 'Auth', '$state', 'SearchResults', function($scope, $location, SearchBar, Auth, $state, SearchResults) {
    $scope.currentUser; 
    $scope.Auth = Auth;
    $scope.SearchBar = SearchBar;
    $scope.$state = $state;

    
    $scope.init = function () {
      $scope.SearchResults = Auth.getUser();
    };

    $scope.backToSearch = function()  {
      console.log(SearchBar.searchParams);
      $location.path('/searchBar').search(SearchBar.searchParams);
    };

    //login
    $scope.loginCredentials = {};
    $scope.errors = {};
    $scope.loginShown = false;

    $scope.toggleLogin = function () {
      $scope.loginShown = !$scope.loginShown;
    };
    $scope.login = function(form) {

      if(form) {
        Auth.login({
          username: $scope.loginCredentials.username,
          password: $scope.loginCredentials.password
        })
        .then(function() {
          // Logged in, redirect to user's dashboard
          $scope.currentUser = Auth.getUser();
          $scope.toggleLogin();
          $scope.Auth.loggedIn = true;
        })
        .catch(function(err) {
          $scope.errors.other = err.message;
        });
      }
    };

    //signup
    $scope.signupCredentials = {};
    $scope.errors = {};
    $scope.signUpShown = false;
    $scope.toggleSignUp = function () {
      $scope.signUpShown = !$scope.signUpShown;
    };

    $scope.signup = function(form) {
      if (form) {
        Auth.createUser({
          username: $scope.signupCredentials.username,
          email: $scope.signupCredentials.email,
          password: $scope.signupCredentials.password
        })
        .then(function() {
          // Account created, redirect to user's dashboard
          $scope.currentUser = Auth.getUser();
          $scope.toggleSignUp();
          $scope.Auth.loggedIn = true;
          
        })
        .catch(function(err) {
          err = err.data;
          $scope.errors = {};
          });
      } else {
        console.log('Form is not valid');
      }
    };

    $scope.logout = function () {
      console.log('logout called');
      Auth.logout();
      $scope.currentUser = Auth.getUser();
      console.log($scope.currentUser);
      $location.path('/');
    }
    $scope.init();
  }]);
'use strict';

angular.module('privateTableApp')
.directive('googleplace', function() {
  return {
    require: 'ngModel',
    link: function(scope, element, attrs, model) {
      var options = {
        types: [],
        componentRestrictions: {}
      };
      scope.gPlace = new google.maps.places.Autocomplete(element[0], options);
      google.maps.event.addListener(scope.gPlace, 'place_changed', function() {
          scope.$apply(function() {
            model.$setViewValue(element.val());                
        });
      });
    }
  };
});
 


'use strict';

angular.module('authFactory', [])
  .factory('Auth', ['$http','$resource', '$cookies', '$q', function($http, $resource, $cookies, $q) {

    var currentUser = {};

    var loggedIn = false;

    if($cookies.get('PrivateTableToken')) {
      currentUser = $resource('api/users/me').get();
    }

    var login = function(credentials) {
      return $resource('auth/local/').save(credentials, function(data) {
        $cookies.put('PrivateTableToken', data.token);
        //if returned a token, find the user based on that token and set current user to the return value
        AuthFactory.currentUser = $resource('api/users/me').get();
      },
      function(err) {
        console.log(err);
        console.log('we need to figure out error handling here');
      }.bind(this)).$promise;
    };

    var createUser = function(credentials) {
      var User = $resource('api/users/');
      return User.save(credentials, function(data) {
        $cookies.put('PrivateTableToken', data.token);
        AuthFactory.currentUser = $resource('api/users/me').get();
      },
      function(err) {
        console.log(err);
        console.log('we need to figure out error handling here');
      }.bind(this)).$promise;
    };

    var getUser = function() {
      return AuthFactory.currentUser;
    };

    var logout = function() {
      $cookies.remove('PrivateTableToken');
      AuthFactory.loggedIn = false;
      AuthFactory.currentUser = {};
    };

    var isLoggedInAsync = function(callback) {
      if(AuthFactory.currentUser.hasOwnProperty('$promise')) {
        AuthFactory.currentUser.$promise.then(function() {
          callback(true);
        }).catch(function() {
          callback(false);
        });
      } else {
        callback(false);
      }
    };

    var checkLoggedIn = function() {
      if ($cookies.get('PrivateTableToken')) {
        AuthFactory.loggedIn = true;
      };
    };

    var AuthFactory = {
      login: login,
      logout: logout,
      createUser: createUser,
      currentUser: currentUser,
      getUser: getUser,
      isLoggedInAsync: isLoggedInAsync,
      loggedIn: loggedIn,
      checkLoggedIn: checkLoggedIn
    };

    return AuthFactory;

  }]);
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
'use strict';

angular.module('bookingsFactory', [])

.factory('Bookings', ['$http', function($http) {
  var bookings = [];
  var currentBooking;

  var getAllBookings = function() {
    var url = '/api/users/bookings';
    $http.get(url)
    .success(function(data, status, headers, config) {
      console.log(data);
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
'use strict';

angular.module('favoriteFactory', [])

.factory('Favorites', ['$location', '$http', 'SearchResults', function($location, $http, SearchResults) {
  var favorites = [];

  var getFavorites = function() {
    var url = '/api/users/favorites';
    $http.get(url)
    .success(function(data, status, headers, config) {
      favorites.splice(0, favorites.length);
      data.forEach(function(val){
        favorites.push(val);
      });
    })
    .error(function(data, status, headers, config) {
      console.log(data);
      console.log('There was an error');
    });
  };
    
  var isFavorite = function (room) {
    var result = false;
    favorites.forEach(function(roomInArray) {
      if (roomInArray.roomID === room.roomID) {
        result = true;
      }
    });
    return result;
  };

  var addFavorite = function (room) {
    var url = '/api/users/favorites/addfavorites';
    console.log(room);
    $http.post(url, {roomID: room})
    .success(function(data, status, headers, config) {
      FavoritesFactory.getFavorites();
    })
    .error(function(data, status, headers, config) {
      console.log(data);
      console.log('There was an error');
    });
  };

  var removeFavorite = function (room) {
    var url = '/api/users/favorites/deletefavorites';
    $http.post(url, {roomID: room})
    .success(function(data, status, headers, config) {
      FavoritesFactory.getFavorites();
    })
    .error(function(data, status, headers, config) {
      console.log(data);
      console.log('There was an error');
    });
  };

  var FavoritesFactory = {
    favorites: favorites,
    removeFavorite: removeFavorite,
    addFavorite: addFavorite,
    isFavorite: isFavorite,
    getFavorites: getFavorites
  };

  return FavoritesFactory;

}]);
'use strict';

angular.module('roomFactory', [])

.factory('roomData', ['SearchResults', '$location', '$http', function(SearchResults, $location, $http) {
  var currentRoom;
  var roomID;
  var allBookedTimes = [];
  var menus = [];
  var currentMenu;
  var checkoutMenu = {};
  checkoutMenu.price = 0;

  var viewRoom = function(room, url, callback, reroute) {
    var toUrl = url + room;
    return $http({
      method: 'GET',
      url: toUrl
    })
    .then(function(response) {
      roomID = response.data.id;
      roomFactory.currentRoom = response.data;
      roomFactory.currentRoom.menuPrices = roomFactory.currentRoom.menuPrices.sort(function(a,b){return a-b;});
      
      if (callback) {
        callback();
      }
      if (reroute) {
        reroute();
      }
      });
  };


  var findAvailableTimes = function(roomID, url, startTime, endTime, callback) {
    var toUrl = url;
    return $http({
      method: 'GET',
      url: toUrl,
      params: {roomID: roomID, startTime: startTime, endTime: endTime}
    })
    .then(function(response) {
      roomFactory.allBookedTimes.splice(0, roomFactory.allBookedTimes.length);
      response.data.allTimeBlocks.forEach(function(val){
        roomFactory.allBookedTimes.push(val);
      });
      if (callback) {
        callback();
      }
    });
  };

  var reroute = function(url, roomID) {
    if (roomID) {
      $location.url($location.path());
      $location.path(url + roomID);
    } else {
      $location.path(url);
    }
  };

  var getRoom = function() {
    return roomFactory.currentRoom;
  };

  var getAllBookedTimes = function() {
    return roomFactory.allBookedTimes;
  };

  var getCurrentMenu = function() {
    return roomFactory.currentMenu;
  };

  var chooseMenu = function(menu) {
    roomFactory.checkoutMenu = menu;
  };
  
  var viewMenus = function(room, eventType, callback) {
    var url = 'api/menu/eventType';
    return $http({
      method: 'GET',
      url: url,
      params: {roomID: room, eventType: eventType}
    })
    .then(function(response){
      roomFactory.menus.splice(0, roomFactory.menus.length);
      response.data.forEach(function(menu) {
        roomFactory.menus.push(menu);
      }); 
      roomFactory.viewCourses(roomFactory.menus[0].id);   
       if (callback) {
        callback();
      }
      });
  };

  var viewCourses = function(menuID, callback) {
  var url = 'api/menu/menuID?';
  return $http({
    method: 'GET',
    url: url,
    params: {menuID: menuID}
  })
  .then(function(response){
    roomFactory.currentMenu = response.data;
    if (callback) {
      callback();
    }
    });
  };

  var roomFactory = {
    menus: menus,
    viewCourses: viewCourses,
    viewMenus: viewMenus,
    currentRoom: currentRoom,
    viewRoom: viewRoom,
    getRoom: getRoom,
    allBookedTimes: allBookedTimes,
    reroute: reroute,
    getAllBookedTimes: getAllBookedTimes,
    getCurrentMenu: getCurrentMenu,
    chooseMenu: chooseMenu,
    currentMenu: currentMenu,
    findAvailableTimes: findAvailableTimes,
    checkoutMenu: checkoutMenu
  };

  return roomFactory;

}]);
'use strict';

angular.module('searchBarFactory', [])

.factory('SearchBar', ['SearchResults', '$location', 'CheckoutOptions', '$state', function(SearchResults, $location, CheckoutOptions, $state) {
  // Your code here
  var searchParams;
  var setSearchParams = function (params, callback, dest) {
    searchBarFactory.searchParams = params;
    CheckoutOptions.setEventParams(searchBarFactory.searchParams);
    if (callback) {
      SearchResults.getSearchResults(searchBarFactory.searchParams, callback, dest);
    } else {
      SearchResults.getSearchResults(searchBarFactory.searchParams);
    }
  };

  var getSearchParams = function() {
    return searchBarFactory.searchParams;
  };

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
    searchFormInit: searchFormInit,
    getSearchParams: getSearchParams,
    setSearchParams: setSearchParams
  };

  return searchBarFactory;

}]);
'use strict';

angular.module('searchResultsFactory', [])

.factory('SearchResults', ['$location', '$http', function($location, $http) {
  var reroute = function(params, dest) {
    console.log(params);
    $location.path(dest).search(params);
  };
  //searchResults can be an array based on a query for search, a user's bookings, or a users favorites

  var searchResults = [];

  var getResults = function (params, url, callback, dest) {
    return $http({
      method: 'GET',
      url: url,
      params: params
    })
    .then(function(response){
      searchResults.splice(0, searchResults.length);
      response.data.forEach(function(val){
        searchResults.push(val);
      });
      if (callback) { callback(params, dest); }
    });
  };

  var getFavoriteResults = function (params) {
    return getResults(params,'api/favoriteResults', reroute, '/favorites');
  };
  
  var getBookingsResults = function (params, callback) {
    return getResults(params, 'api/bookingsResults', reroute, '/bookings');
  };

  // this is a helper function used adjusting time format in the query timestamp; it's not exported
  var timeConverter = function (timeString) {
    var time = timeString.split(' ');
    var timeH = time[0].split(':');
    var timeM = timeH[1];
    var timeH = timeH[0];
    var ampm = time[1];
    if (ampm.indexOf('PM') > -1) {
    timeH = Number(timeH);
    timeH = timeH + 12;
    if (timeH === 24) {
      timeH = 12;      
    }
    } else if (timeH.indexOf('12') > -1) {
      timeH = '00';
    } else if (Number(timeH) < 10) {
      timeH = "0"+timeH;
    }
    return timeH+":"+timeM+':00'
  };

  var createDate = function(date, dateFormatted) {
    date = date.split('/');
    dateFormatted += date[2]+ '-' + date[0] + '-' + date[1];
    return dateFormatted;
  };


  var getSearchResults = function(params, callback, dest) {
    //location only city
    //time format: YYYY-MM-DD HH:MM:SS
    var data = {};
    var startTimeStamp = "";
    var endTimeStamp = "";
    if (params.date) {
      startTimeStamp = createDate(params.date, startTimeStamp);
      endTimeStamp = createDate(params.date, endTimeStamp);
    }
    
    if (params.startTime) {
      var startTime = timeConverter(params.startTime);
      startTimeStamp += ' ' + startTime;
    }

    if (params.endTime) {
      var endTime = timeConverter(params.endTime);
      endTimeStamp += ' ' + endTime;
    }

    if (startTimeStamp) {data.startTimeStamp = startTimeStamp;}
    if (endTimeStamp) {data.endTimeStamp = endTimeStamp;}
    if (params.guests) {data.guests = params.guests;}
    if (params.budget) {data.budget = params.budget;}
    if (params.eventType) {data.eventType = params.eventType;}


    var geocoder = new google.maps.Geocoder();
    geocoder.geocode({'address': params.location}, function(results, status) {
      if (status == google.maps.GeocoderStatus.OK) {
        data.lng = results[0].geometry.location.F;
        data.lat = results[0].geometry.location.A;

        var addressTypes = results[0].address_components;
        for (var i = 0; i < addressTypes.length; i++) {
          if (addressTypes[i].types[0] === "locality") {
            data.city = addressTypes[i].long_name;
          }
          if (addressTypes[i].types[0] === "administrative_area_level_1") {
            data.state = addressTypes[i].long_name;
          }
          if (addressTypes[i].types[0] === "country") {
            data.country = addressTypes[i].long_name;
          }
        }
        return getResults(data, 'api/searchresults', callback, dest);
      } else {
        console.log('No location entered');
      }
    });
  };



  //onlyBookings is a variable to determine which bookings are shown in the Bookings tab; it is not exported
  var onlyBookings;
  var bookingsSelection = function (room) {
    if (onlyBookings && room.eventType) {
      return (room.eventType === onlyBookings) ? true : false;
    }
    return true;
  };
  //these functions are called in various controllers to determine the state of onlyBookings and in turn, which bookings and results are displayed
  var showAll = function () {
    onlyBookings = undefined;
  };

  var showPurchased = function () {
    onlyBookings = 'purchased';
  };

  var showPlanning = function () {
    onlyBookings = 'planning';
  };

  var dbTimeConverter = function(time) {
    //the time we get back from our DB looks like this:
    //"2015-06-23T15:00:00.000Z" so we need to split by the T and "."
    return ((time.split('T'))[1]).split('.')[0];
  };

  return {
    getFavoriteResults: getFavoriteResults,
    searchResults: searchResults,
    getSearchResults: getSearchResults,
    getResults: getResults,
    reroute: reroute,
    timeConverter: timeConverter,
    bookingsSelection: bookingsSelection,
    showPlanning: showPlanning,
    showPurchased: showPurchased,
    showAll: showAll,
    createDate: createDate,
    dbTimeConverter: dbTimeConverter
  };

}]);
