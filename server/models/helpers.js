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

// module.exports.getSearchResults = function(params, response) {
//   sequelize.query(

//     Rooms.find({where: {}}).then(function(user) {
//       if(user) {

//         if (user.checkPassword(password)) {
//           var profile = {
//             username: user.username,
//             email: user.email
//           };
//           console.log("User authenticated!");
//           response.json({token: jwt.sign(profile, secret, { expiresInMinutes: 60 * 5})});
//         } else {
//           console.log("Bad Password, Charlie");
//           response.send(401, "Wrong username or password");
//         }
//       } else {

//         console.log("Whoops, user doesn't exsist");
//         response.send(401, "Wrong username or password");
//       }
//     });
//     )
// };

//  sequelize.query(SELECT * FROM Rooms AS r
//  WHERE r.id IN (
//  SELECT b.room FROM bookings AS b
//  WHERE (b.end < startTime )  
//      OR
//  b.start > endTime);         



// Rooms.findAll({where: r.id: req.body.params.})


// <= : "before"
// >= : "after"



if (eventType === 'banquet'){
  sequelize.query( 
    SELECT venueName, roomName, heroImage, contactImage, contactFirstName, contactLastName, contactTitle
    FROM Room
    INNER JOIN Venue
    ON parentVenue=id
    WHERE Venue.city = '+params.city'
    AND Room.minSpend >= "budget"
    AND Room.banquetCapacity >= "guests"
    AND Room.id IN (
      SELECT Booking.room FROM Booking
      WHERE Booking.end <= "startTimeStamp"
      OR Booking.start >= "endTimeStamp")
    )
}else if (eventType === 'reception'){
  sequelize.query( 
    SELECT venueName, roomName, heroImage, contactImage, contactFirstName, contactLastName, contactTitle
    FROM Room
    INNER JOIN Venue
    ON parentVenue=id
    WHERE Venue.city = "city"
    AND Room.minSpend >= "budget"
    AND Room.receptionCapacity >= "guests"
    AND Room.id IN (
      SELECT Booking.room FROM Booking
      WHERE Booking.end <= "startTimeStamp"
      OR Booking.start >= "endTimeStamp")
    )
}else{
  sequelize.query( 
    SELECT venueName, roomName, heroImage, contactImage, contactFirstName, contactLastName, contactTitle
    FROM Room
    INNER JOIN Venue
    ON parentVenue=id
    WHERE Venue.city = "city"
    AND Room.minSpend >= "budget"
    AND Room.receptionAndBanquetCapacity >= "guests"
    AND Room.id IN (
      SELECT Booking.room FROM Booking
      WHERE Booking.end <= "startTimeStamp"
      OR Booking.start >= "endTimeStamp")
    )
}










