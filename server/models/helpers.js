var Sequelize = require('sequelize');
var Booking = require('./bookings.js');
var Image = require('./images.js');
var Venue = require('./venues.js');
var Room = require('./rooms.js');
var Course = require('./courses.js');
var Menu = require('./menus.js');
var MenuItem = require('./menuItems.js');
var CourseCombination = require('./courseCombinations.js');
var CoursesInMenu = require('./coursesInMenus.js');
var RoomAmenity = require('./roomAmenities.js');
var Amenity = require('./amenities.js');
var Association = require('./associations.js');

module.exports.getSearchResults = function(params, response) {
  params.guests = params.guests || 0;
  params.budget = params.budget || 99999999999;

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
    Venue.findAll({where: {city: params.city}, include: [{model: Room, where: {minSpend: {$lte: params.budget}, receptionAndBanquetCapacity: {$gte: params.guests}}}]}).then(function(rooms) {
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













