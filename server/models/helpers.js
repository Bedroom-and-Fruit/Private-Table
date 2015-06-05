var Sequelize = require('sequelize');
var Booking = require('./bookings.js');
var Images = require('./images.js');
var Venue = require('./venues.js');
var Room = require('./rooms.js');
var Course = require('./courses.js');
var Menu = require('./menus.js');
var MenuItem = require('./menuItems.js');
var CourseCombination = require('./courseCombinations.js');
var CoursesInMenu = require('./coursesInMenus.js');
var RoomAmenity = require('./roomAmenities.js');
var Amenity = require('./amenities.js');
var User = require('./users.js');
var Layout = require('./layouts.js');
var LayoutsOffered = require('./layoutsOffered.js');
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

  //banquet
  if (params.eventType === 'Banquet') {
    Venue.findAll({where: {city: params.city}, include: [{model: Room, where: {minSpend: {$lte: params.budget}, banquetCapacity: {$gte: params.guests}}}]}).then(function(rooms) {
     if(rooms) {
      var allRooms = [];
      for (var i = 0; i < rooms.length; i++) {
        var roomsInVenue = rooms[i].dataValues.Rooms;
        for (var j = 0; j < roomsInVenue.length; j++) {
          allRooms.push(roomsInVenue[j].dataValues);
        }
      }
      var allRoomsId = [];
      for (var k = 0; k < allRooms.length; k ++) {
        allRoomsId.push(allRooms[k].id);
      }
      Booking.findAll({where: {$or: [{end: {$lte: params.startTimeStamp}}, {start: {$gte: params.endTimeStamp}}]}, include: [{model: Room, where: {id: allRoomsId}}]}).then(function(availableRooms) {
        if (availableRooms) {
          var allAvailableRooms = [];
          for (var i = 0; i < availableRooms.length; i++) {
            allAvailableRooms.push(availableRooms[i].dataValues.Room.dataValues.id);
          }
          Room.findAll({where: {id: allAvailableRooms}, include: [Venue]}).then(function(allAvailRooms) {
            var roomsToClient = [];
            if(allAvailRooms) {
              for (var i = 0; i < allAvailRooms.length; i++) {
                roomsToClient.push({
                  contactFullName: allAvailRooms[i].dataValues.Venue.dataValues.contactFirstName + ' ' + allAvailRooms[i].dataValues.Venue.dataValues.contactLastName,
                  contactTitle: allAvailRooms[i].dataValues.Venue.dataValues.contactTitle,
                  venue: allAvailRooms[i].dataValues.Venue.dataValues.venueName,
                  room: allAvailRooms[i].dataValues.roomName,
                  roomID: allAvailRooms[i].dataValues.id,
                  roomImage: allAvailRooms[i].dataValues.heroImage,
                  contactImage: allAvailRooms[i].dataValues.Venue.dataValues.contactImage
                });
              }
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
  }


//for reception
  else if (params.eventType === 'Reception') {
    Venue.findAll({where: {city: params.city}, include: [{model: Room, where: {minSpend: {$lte: params.budget}, receptionCapacity: {$gte: params.guests}}}]}).then(function(rooms) {
     if(rooms) {
      var allRooms = [];
      for (var i = 0; i < rooms.length; i++) {
        var roomsInVenue = rooms[i].dataValues.Rooms;
        for (var j = 0; j < roomsInVenue.length; j++) {
          allRooms.push(roomsInVenue[j].dataValues);
        }
      }
      var allRoomsId = [];
      for (var k = 0; k < allRooms.length; k ++) {
        allRoomsId.push(allRooms[k].id);
      }
      Booking.findAll({where: {$or: [{end: {$lte: params.startTimeStamp}}, {start: {$gte: params.endTimeStamp}}]}, include: [{model: Room, where: {id: allRoomsId}}]}).then(function(availableRooms) {
        if (availableRooms) {
          var allAvailableRooms = [];
          for (var i = 0; i < availableRooms.length; i++) {
            allAvailableRooms.push(availableRooms[i].dataValues.Room.dataValues.id);
          }
          Room.findAll({where: {id: allAvailableRooms}, include: [Venue]}).then(function(allAvailRooms) {
            var roomsToClient = [];
            if(allAvailRooms) {
              for (var i = 0; i < allAvailRooms.length; i++) {
                roomsToClient.push({
                  contactFullName: allAvailRooms[i].dataValues.Venue.dataValues.contactFirstName + ' ' + allAvailRooms[i].dataValues.Venue.dataValues.contactLastName,
                  contactTitle: allAvailRooms[i].dataValues.Venue.dataValues.contactTitle,
                  venue: allAvailRooms[i].dataValues.Venue.dataValues.venueName,
                  room: allAvailRooms[i].dataValues.roomName,
                  roomID: allAvailRooms[i].dataValues.id,
                  roomImage: allAvailRooms[i].dataValues.heroImage,
                  contactImage: allAvailRooms[i].dataValues.Venue.dataValues.contactImage
                });
              }
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
  }

//for reception and banquet
  else if (params.eventType === 'Reception and Banquet') {
    Venue.findAll({where: {city: params.city}, include: [{model: Room, where: {minSpend: {$lte: params.budget}, banquetCapacity: {$gte: params.guests}, receptionCapacity: {$gte: params.guests}}}]}).then(function(rooms) {
     if(rooms) {
      var allRooms = [];
      for (var i = 0; i < rooms.length; i++) {
        var roomsInVenue = rooms[i].dataValues.Rooms;
        for (var j = 0; j < roomsInVenue.length; j++) {
          allRooms.push(roomsInVenue[j].dataValues);
        }
      }
      var allRoomsId = [];
      for (var k = 0; k < allRooms.length; k ++) {
        allRoomsId.push(allRooms[k].id);
      }
      Booking.findAll({where: {$or: [{end: {$lte: params.startTimeStamp}}, {start: {$gte: params.endTimeStamp}}]}, include: [{model: Room, where: {id: allRoomsId}}]}).then(function(availableRooms) {
        if (availableRooms) {
          var allAvailableRooms = [];
          for (var i = 0; i < availableRooms.length; i++) {
            allAvailableRooms.push(availableRooms[i].dataValues.Room.dataValues.id);
          }
          Room.findAll({where: {id: allAvailableRooms}, include: [Venue]}).then(function(allAvailRooms) {
            var roomsToClient = [];
            if(allAvailRooms) {
              for (var i = 0; i < allAvailRooms.length; i++) {
                roomsToClient.push({
                  contactFullName: allAvailRooms[i].dataValues.Venue.dataValues.contactFirstName + ' ' + allAvailRooms[i].dataValues.Venue.dataValues.contactLastName,
                  contactTitle: allAvailRooms[i].dataValues.Venue.dataValues.contactTitle,
                  venue: allAvailRooms[i].dataValues.Venue.dataValues.venueName,
                  room: allAvailRooms[i].dataValues.roomName,
                  roomID: allAvailRooms[i].dataValues.id,
                  roomImage: allAvailRooms[i].dataValues.heroImage,
                  contactImage: allAvailRooms[i].dataValues.Venue.dataValues.contactImage
                });
              }
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
  }
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


// Venue.findAll({where: {city: params.city}, include: [{model: Room, where: {minSpend: {$lte: params.budget}, banquetCapacity: {$gte: params.guests}, receptionCapacity: {$gte: params.guests}}}]}).then(function(rooms)

module.exports.findRoom = function(room, response) {
  Room.find({where: {id: room}, include: [Venue, RoomAmenity]}).then(function(roomFound) {
    if (roomFound){
      
      var allRoomAmenityId = [];
      
      for (var i = 0; i < roomFound.RoomAmenities.length; i++){
        allRoomAmenityId.push(roomFound.RoomAmenities[i].dataValues.amenities_ID);
      }

      Amenity.findAll({where: {id: allRoomAmenityId}}).then(function(amenitiesFound){
        var roomAmenitiesFound =[];
        for (var i=0; i<allRoomAmenityId.length; i++){
          roomAmenitiesFound.push(amenitiesFound[i].dataValues.name);
        } 
      
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
        amenities: roomAmenitiesFound
      }
      response.json(roomInfo);
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

module.exports.serveMenus = function(room,response){
  MenusOffered.find(where{room_ID:room}).then(function(menu){
    if(menu){
      var menus = [];
    }
  })
};

module.exports.addFavorite = function () {

};

module.exports.deleteFavorite = function () {

};

module.exports.viewBookings = function () {

};

