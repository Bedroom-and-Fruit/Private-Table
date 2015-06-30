var Sequelize = require('sequelize');
var Booking = require('./bookings.js');
var Images = require('./images.js');
var Venue = require('./venues.js');
var Room = require('./rooms.js');
var Menu = require('./menus.js');
var MenuItem = require('./menuItems.js');
var CourseCombination = require('./courseCombinations.js');
var CoursesInMenu = require('./coursesInMenus.js');
var RoomAmenity = require('./roomAmenities.js');
var Amenity = require('./amenities.js');
var User = require('./users.js');
var Layout = require('./layouts.js');
var Service = require('./services.js');
var Favorite = require('./favorites.js');
var MenusOffered = require ('./menusOffered.js');
var Association = require('./associations.js');
var jwt = require('jsonwebtoken');

module.exports.getSearchResults = function(params, response) {
  params.guests = params.guests || 0;
  params.budget = params.budget || 99999999999;
  params.eventType = params.eventType || 'Reception and Banquet';
  params.startTimeStamp = params.startTimeStamp || new Date().toISOString().slice(0, 19).replace('T', ' ');
  params.endTimeStamp = params.endTimeStamp || params.startTimeStamp;

  // determines parameters for Venue search based on eventType
  var capacityLimits;
  if (params.eventType === "Banquet") {
    capacityLimits = {minSpend: {$lte: params.budget}, banquetCapacity: {$gte: params.guests}};
  } else if (params.eventType === "Reception") {
    capacityLimits = {minSpend: {$lte: params.budget}, receptionCapacity: {$gte: params.guests}};
  } else {
    capacityLimits = {minSpend: {$lte: params.budget}, banquetCapacity: {$gte: params.guests}, receptionCapacity: {$gte: params.guests}};
  }

  //makes venue request and sends back results
  Venue.findAll({where: {city: params.city}, include: [{model: Room, where: capacityLimits }]}).then(function(rooms) {
       if(rooms) {
        var allRooms = [];
        rooms.forEach(function(room) {
          var roomsInVenue = room.dataValues.Rooms;
          roomsInVenue.forEach(function(roomInVenue) {
            allRooms.push(roomInVenue.dataValues);
          })
        })
        var allRoomsId = [];
        allRooms.forEach(function(allRoom) {
          allRoomsId.push(allRoom.id);
        });
        
        Booking.findAll({where: {$or: [{end: {$lte: params.startTimeStamp}}, {start: {$gte: params.endTimeStamp}}]}, include: [{model: Room, where: {id: allRoomsId}}]}).then(function(availableRooms) {
          if (availableRooms) {
            var allAvailableRooms = [];
            availableRooms.forEach(function(availableRoom){
              allAvailableRooms.push(availableRoom.dataValues.Room.dataValues.id);
            });
            Room.findAll({where: {id: allAvailableRooms}, include: [Venue]}).then(function(allAvailRooms) {
              var roomsToClient = [];
              if(allAvailRooms) {
                allAvailRooms.forEach(function(allAvailRoom){
                  var currentVenue = allAvailRoom.dataValues.Venue.dataValues;
                  var currentRoom = allAvailRoom.dataValues;
                  roomsToClient.push({
                    contactFullName: currentVenue.contactFirstName + ' ' + currentVenue.contactLastName,
                    contactTitle: currentVenue.contactTitle,
                    venue: currentVenue.venueName,
                    room: currentRoom.roomName,
                    roomID: currentRoom.id,
                    roomImage: currentRoom.heroImage,
                    contactImage: currentVenue.contactImage
                  });
                });
                response.json(roomsToClient);
              } else {
                console.log("No bookings available!");
                response.send(401, "No bookings available!");
              }
            });
          } else {
            console.log("No bookings available!");
            response.send(401, "No bookings available!");
          }
        });
    } else {
      console.log("No venues found for the requested location!");
      response.send(401, "No venues found for the requested location!");
    }
  });
};

module.exports.authenticate = function(username, password, response, secret) {
  User.find({where: {username: username}}).then(function(user) {
    if(user) {

      if (user.checkPassword(password)) {
        var profile = {
          username: user.username,
          email: user.email
        };
        console.log("User authenticated!");
        console.log(profile);
        response.json({token: jwt.sign(profile, secret, { expiresInMinutes: 60 * 5})});
      } else {
        console.log("Bad Password, Charlie");
        response.send(401, "Wrong username or password");
      }
    } else {

      console.log("Whoops, user doesn't exsist");
      response.send(401, "Wrong username or password");

    }
  });
};



module.exports.findRoom = function(room, response) {
  Room.find({where: {id: room}, include: [Venue, RoomAmenity, MenusOffered]}).then(function(roomFound) {
    if (roomFound){
      
      var allRoomAmenityId = [];
      roomFound.RoomAmenities.forEach(function(roomAmenity){
        allRoomAmenityId.push(roomAmenity.dataValues.amenities_ID);
      });
      // for (var i = 0; i < roomFound.RoomAmenities.length; i++){
      //   allRoomAmenityId.push(roomFound.RoomAmenities[i].dataValues.amenities_ID);
      // }

      Amenity.findAll({where: {id: allRoomAmenityId}}).then(function(amenitiesFound){
        var roomAmenitiesFound =[];
        amenitiesFound.forEach(function(amenityFound) {
          roomAmenitiesFound.push(amenityFound.dataValues.name);
        });

        var menuPrices = [];
        MenusOffered.findAll({where: {room_ID: room}, include: [Menu]}).then(function(roomMenus) {
          roomMenus.forEach(function(roomMenu, index, roomMenus){
            Menu.find({where: {id: roomMenu.dataValues.menu_ID}}).then(function(menu) {
              menuPrices.push(menu.dataValues.price);
              if (menuPrices.length === roomMenus.length) {
                var allRoomInformation = roomFound.dataValues;
                var allVenueInformation = roomFound.dataValues.Venue.dataValues;
                var roomInfo = {
                  cancelPolicy: allRoomInformation.cancelPolicy,
                  cleaningFee: allRoomInformation.cleaningFee,
                  description: allRoomInformation.description,
                  durationOverageFee: allRoomInformation.durationOverageFee,
                  eventDuration: allRoomInformation.eventDuration,
                  heroImage: allRoomInformation.heroImage,
                  houseRules: allRoomInformation.houseRules,
                  id: allRoomInformation.id,
                  minSpend: allRoomInformation.minSpend,
                  parentVenue: allRoomInformation.parentVenue,
                  roomName: allRoomInformation.roomName,
                  roomRentalFee: allRoomInformation.roomRentalFee,
                  receptionCapacity: allRoomInformation.receptionCapacity,
                  banquetCapacity: allRoomInformation.banquetCapacity,
                  size: allRoomInformation.size,
                  type: allRoomInformation.type,
                  houseRules: allVenueInformation.houseRules,
                  menuLeadTime: allVenueInformation.menuLeadTime,
                  venueCancelPolicy: allVenueInformation.cancelPolicy,
                  venueName: allVenueInformation.venueName,
                  taxRate: allVenueInformation.taxRate,
                  autogratRate: allVenueInformation.autogratRate,
                  autogratMinGuests: allVenueInformation.autogratMinGuests,
                  cuisineType: allVenueInformation.cuisineType,
                  amenities: roomAmenitiesFound,
                  menuNumber: menuPrices.length,
                  menuPrices: menuPrices
                }
                response.json(roomInfo);
              }
            });
          })
        });
    })
  } else {
      console.log('The room should exist...');
      response.send(401, "The room disappeared!");
    }
  })
};

module.exports.searchOrMake = function(username, email, password, response, secret) {
  User.find({where: {username: username}}).then(function(user) {
    if(user) {
      console.log('User exists');
      response.send(401, "That user already exists!");
    } else {
      User.create({username: username, email: email}).then(function(user) {
        user.password = user.setPassword(password);
        var profile = {
          username: user.username,
          email: user.email
        };
        console.log("User created");
        response.json({token: jwt.sign(profile, secret, {expiresInMinutes: 60 * 5})});
      })
    }
  });
};

module.exports.findDates = function(room, startTime, endTime, response) {   
  //can also add in this all dates before the current date to disable bookings for the past    
  Room.find({where: {id: room}, include: [{model: Booking, where: {$and: [{end: {$lte: endTime}}, {start: {$gte: startTime}}]}}]}).then(function(roomsWithBookings) {    
    if (roomsWithBookings) {   
      var bookingsArray = roomsWithBookings.dataValues.Bookings;   
      var allTimeBlocks = [];    
      for (var i = 0; i < bookingsArray.length; i++) {   
        allTimeBlocks.push({start: bookingsArray[i].dataValues.start, end: bookingsArray[i].dataValues.end});    
      }    
      console.log(allTimeBlocks);    
      var bookedTimes = {    
        allTimeBlocks: allTimeBlocks   
      };   
      response.json(bookedTimes);    
    } else {   
      var bookedTimes = {allTimeBlocks: []};   
      response.json(bookedTimes);    
    }        
  });      
};

module.exports.findAllInfo = function(username, response) {
  User.find({where: {username: username}}).then(function(user) {
    if(user) {
      var profile = {
        username: user.username,
        email: user.email
      };
      console.log("Here's all the info!");
      response.json(profile);
    } else {
        console.log("User not found");
        response.send(401, "User not found!");
    }
  });
};


module.exports.serveMenus = function(params, response){
  MenusOffered.findAll({where: {room_ID: params.roomID}, include: [Menu]}).then(function(menusOffered){
    if(menusOffered) {
      var allMenusOffered = [];
      var formatMenuReturn = function (menuFound) {
            var menu = {};
            menu.price = menuFound.dataValues.price;
            menu.name = menuFound.dataValues.name;
            menu.id = menuFound.dataValues.id;
            allMenusOffered.push(menu);
            if (allMenusOffered.length === menusOffered.length) {
              response.json(allMenusOffered);
            }
          };
      for (var i = 0; i < menusOffered.length; i++) {
        if (params.eventType === "Banquet") {
          Menu.find({where: {id: menusOffered[i].dataValues.menu_ID, banquet: true}})
          .then(formatMenuReturn);
        } else if (params.eventType === "Reception") {
          Menu.find({where: {id: menusOffered[i].dataValues.menu_ID, reception: true}})
          .then(formatMenuReturn);
        } else {
          Menu.find({where: {id: menusOffered[i].dataValues.menu_ID}})
          .then(formatMenuReturn);
        }
      }
    } else {
        console.log("Menus not found");
        response.send(401, "Menus not found!");
    }
  });
};


module.exports.serveCourses = function (menuID, response) {
  CoursesInMenu.findAll({where: {menu_ID: menuID}}).then(function(coursesInMenu) {
    if (coursesInMenu) {
      var finalCourseOfferings = [];
      var courseOfferings = {};
      for (var i = 0; i < coursesInMenu.length; i++) { 
        var courseOrder = coursesInMenu[i].dataValues.courseOrder;
        CourseCombination.findAll({where: {id: coursesInMenu[i].dataValues.courseCombination_ID}}).then(function(combos) {
        if(combos){
          var menuItemCounter = 0;
          for (var i = 0; i < combos.length; i++){
            var courseName = combos[i].dataValues.courseName;
            var menuItemID = combos[i].dataValues.menuItem_ID;
            if (!courseOfferings[courseName]){
            }
          }
          for (var i = 0; i < combos.length; i++){
            var courseName = combos[i].dataValues.courseName;
            var menuItemID = combos[i].dataValues.menuItem_ID;
            if (!courseOfferings[courseName]){
              courseOfferings[courseName] = {name: courseName};
              courseOfferings[courseName].menuItems = [];
              courseOfferings[courseName].courseOrder = this;
            }
            MenuItem.find({where: {id: menuItemID}}).then(function(menuItem) {
              if (menuItem) {
                var formattedMenuItem = {};
                formattedMenuItem.name = menuItem.dataValues.name;
                formattedMenuItem.description = menuItem.dataValues.description;
                courseOfferings[courseName].menuItems.push(formattedMenuItem);
                menuItemCounter++;
              }
              //when all menu items are in course, add course to finalArray of courses
              if (menuItemCounter === combos.length) {
                finalCourseOfferings.push(courseOfferings[courseName]);
              }
              //when all courses have been added, console log the finalArray of courses
              if (finalCourseOfferings.length === coursesInMenu.length) {
                response.json(courseOfferings);
              }
            });
          }
        } 
        }.bind(courseOrder));
      }
    }
  });
};


module.exports.addFavorite = function(username, roomId, response) {
  User.find({where: {username: username}}).then(function(user) {
    var userId = user.dataValues.id;
    Favorite.find({where: {user_ID: userId, room_ID: roomId}}).then(function(room_ID) {
      if (room_ID){
        response.send(201, "You already added this room to favorites");
      } else {
        Favorite.create({user_ID: userId, room_ID: roomId}).then(function(){
          response.send(201, "Room favorited");
        })
      }
    })
  })
};

module.exports.getFavorites = function(username, response) {
  User.find({where: {username: username}}).then(function(user) {
    var userId = user.dataValues.id;
    Favorite.findAll({where: {user_ID: userId}}).then(function(rooms) {
    if (rooms){
      var roomsToClient = [];
      var sendLength = rooms.length;
      rooms.forEach(function(room){
        Room.find({where: {id: room.room_ID}, include: [Venue]}).then(function(roomData) {
              if(roomData) {
                roomsToClient.push({
                  contactFullName: roomData.dataValues.Venue.dataValues.contactFirstName + ' ' + roomData.dataValues.Venue.dataValues.contactLastName,
                  contactTitle: roomData.dataValues.Venue.dataValues.contactTitle,
                  venue: roomData.dataValues.Venue.dataValues.venueName,
                  room: roomData.dataValues.roomName,
                  roomID: roomData.dataValues.id,
                  roomImage: roomData.dataValues.heroImage,
                  contactImage: roomData.dataValues.Venue.dataValues.contactImage
                });
              } else {
                response.send(501, "Favorite not found");
              }
              if (roomsToClient.length === sendLength) {
                response.json(roomsToClient);
              }
            });
          })
      } else {
        response.send(501, "Favorites not found");
      }
    });
  });
};


module.exports.deleteFavorite = function (username, roomId, response) {
  User.find({where: {username: username}}).then(function(user) {
    var userId = user.dataValues.id;
    Favorite.find({where: {user_ID: userId, room_ID: roomId}}).then(function(room_ID) {
      if (room_ID) {
        Favorite.destroy({where: {user_ID: userId, room_ID: roomId}}).then(function(){
          response.send(201, "Favorite deleted");
        })
      } else {
          response.send(201, "This room was not a favorite");
      }
    })
  })
};


module.exports.createBooking = function (username, roomId, menuId, startTime, endTime, eventType, guests, response) {
  User.find({where: {username: username}}).then(function(user) {
    var userId = user.dataValues.id;
    Booking.create({booker: userId, room: roomId, start: startTime, end: endTime}).then(function(){
        response.send(201, "Booking complete");
    })
  })
};


module.exports.getBookings = function (username, response) {
  User.find({where: {username: username}}).then(function(user) {
  var userId = user.dataValues.id;
    Booking.findAll({where: {booker: userId}}).then(function(bookings) {
    if (bookings){
      var bookingsToClient = [];
      var sendLength = bookings.length;
      bookings.forEach(function(booking){
        Room.find({where: {id: booking.room}, include: [Venue]}).then(function(roomData) {
              if(roomData) {
                bookingsToClient.push({
                  bookingStartTime: booking.dataValues.start,
                  bookingEndTime: booking.dataValues.end,
                  contactFullName: roomData.dataValues.Venue.dataValues.contactFirstName + ' ' + roomData.dataValues.Venue.dataValues.contactLastName,
                  contactTitle: roomData.dataValues.Venue.dataValues.contactTitle,
                  venue: roomData.dataValues.Venue.dataValues.venueName,
                  room: roomData.dataValues.roomName,
                  roomID: roomData.dataValues.id,
                  roomImage: roomData.dataValues.heroImage,
                  contactImage: roomData.dataValues.Venue.dataValues.contactImage
                });
              } else {
                response.send(501, "No bookings found");
              }
              if (bookingsToClient.length === sendLength) {
                response.json(bookingsToClient);
              }
            });
          })
      } else {
        response.send(501, "Bookings not found");
      }
    });
  })
};





