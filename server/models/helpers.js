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

module.exports.hello = function(username) {
  Venue.find({where: {username: username}}).then(function(user) {
    if(user) {
        console.log(user);
        console.log("User authenticated!");
        response.json({user: user});
    } else {
      console.log("Whoops, user doesn't exsist");
      response.send(401, "Wrong username or password");
    }
  });
};


// module.exports.searchResults = function(){
// //1. search to see if room is avail for date/time specified
// Booking.find({where: {(date !== date) || (date === date && ) }})

//   Room.find(where{ minSpend >= minSpend && });

//};

// sequelize.query(


// SELECT * FROM Rooms AS r
// 

// WHERE NOT ([end date] < start OR ([start date] > end))

// WHERE (a.end <= [start date] AND b.start >= [end date])

//)


//SELECT r.room_id
//FROM rooms r
//WHERE r.room_id NOT IN (
//    SELECT b.room_id FROM bookings b
//    WHERE NOT (b.end_datetime   < '2012-09-14T18:00'
//               OR
//               b.start_datetime > '2012-09-21T09:00'))
//ORDER BY r.room_id;



// SQL alias!!!! ('AS')

// mysql --user=root

// <= : "before"
// >= : "after"

















