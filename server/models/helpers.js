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
          for (var i = 0; i < allAvailableRooms.length; i++) {
            var roomsAvailable = allAvailableRooms[i].dataValues.Rooms;
            for (var j = 0; j < roomsInVenue.length; j++) {
              allRooms.push(roomsInVenue[j].dataValues);
            }
          }
          response.send(201, "Done!");
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

// if (eventType === 'banquet'){
//   sequelize.query( 
//     SELECT venueName, roomName, heroImage, contactImage, contactFirstName, contactLastName, contactTitle
//     FROM Room
//     INNER JOIN Venue
//     ON parentVenue=id
//     WHERE Venue.city = '+params.city'
//     AND Room.minSpend >= "budget"
//     AND Room.banquetCapacity >= "guests"
//     AND Room.id IN (
//       SELECT Booking.room FROM Booking
//       WHERE Booking.end <= "startTimeStamp"
//       OR Booking.start >= "endTimeStamp")
//     )
// }else if (eventType === 'reception'){
//   sequelize.query( 
//     SELECT venueName, roomName, heroImage, contactImage, contactFirstName, contactLastName, contactTitle
//     FROM Room
//     INNER JOIN Venue
//     ON parentVenue=id
//     WHERE Venue.city = "city"
//     AND Room.minSpend >= "budget"
//     AND Room.receptionCapacity >= "guests"
//     AND Room.id IN (
//       SELECT Booking.room FROM Booking
//       WHERE Booking.end <= "startTimeStamp"
//       OR Booking.start >= "endTimeStamp")
//     )
// }else{
//   sequelize.query( 
//     SELECT venueName, roomName, heroImage, contactImage, contactFirstName, contactLastName, contactTitle
//     FROM Room
//     INNER JOIN Venue
//     ON parentVenue=id
//     WHERE Venue.city = "city"
//     AND Room.minSpend >= "budget"
//     AND Room.receptionAndBanquetCapacity >= "guests"
//     AND Room.id IN (
//       SELECT Booking.room FROM Booking
//       WHERE Booking.end <= "startTimeStamp"
//       OR Booking.start >= "endTimeStamp")
//     )
// }


// <= : "before"
// >= : "after"










