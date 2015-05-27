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
  sequelize.query(

    Rooms.find({where: {}}).then(function(user) {
      if(user) {

        if (user.checkPassword(password)) {
          var profile = {
            username: user.username,
            email: user.email
          };
          console.log("User authenticated!");
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
    )
};

//city
//start time
//end time
//event type
//guests
//budget
// 'availFor'+eventType = true AND eventType+'Capacity' > guests


 sequelize.query(SELECT * FROM Rooms AS r
 WHERE city=city AND minSpend < budget AND r.id IN (
 SELECT b.room FROM bookings AS b
 WHERE (b.end < startTime )  
     OR
 b.start > endTime);         



Rooms.findAll({where: r.id: req.body.params.})


// <= : "before"
// >= : "after"














