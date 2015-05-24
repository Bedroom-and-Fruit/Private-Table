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