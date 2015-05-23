var Booking = require('./bookings.js');
var Image = require('./images.js');
var Venue = require('./venue.js');
var Room = require('./rooms.js');
var Course = require('./courses.js');
var Menu = require('./menus.js');
var MenuItem = require('./menuItems.js');
var db = require('../config/dbConfig.js');
var CourseCombination = require('./courseCombinations.js');
var CoursesInMenu = require('./coursesInMenus.js');
var RoomAmenity = require('./roomAmenities.js');
var Amenity = require('/.amenities.js');

//relationship between venue and room
Venue.hasMany(Room, {foreignKey: 'parentVenue'});
Room.belongsTo(Venue, {foreignKey: 'parentVenue'});

//relationship between venue and menu
Venue.hasMany(Menu, {foreignKey:'parentVenue'});
Menu.belongsTo(Venue, {foreignKey: 'parentVenue'});

// relationship between room and image
Room.hasMany(Image, {foreignKey:'pictureOf'});
Image.belongsTo(Room, {foreignKey: 'pictureOf'});

// relationship between booking and room
Room.hasMany(Booking, {foreignKey:'room'});
Booking.belongsTo(Room, {foreignKey: 'room'});

// relationship between room and roomAmenity
Room.hasMany(RoomAmenity, {foreignKey:'room_ID'});
RoomAmenity.belongsTo(Room, {foreignKey: 'room_ID'});

// relationship between roomAmenity and Amenity
Amenity.hasMany(RoomAmenity, {foreignKey:'amenities_ID'});
RoomAmenity.belongsTo(Amenity, {foreignKey: 'amenities_ID'});

// relationship between courseCombination and course
Course.hasMany(courseCombination, {foreignKey:'course_ID'});
CourseCombination.belongsTo(Course, {foreignKey: 'course_ID'});

// relationship between coursesInMenu and menu
Menu.hasMany(CoursesInMenu, {foreignKey:'menu_ID'});
CoursesInMenu.belongsTo(Menu, {foreignKey: 'menu_ID'});

// relationship between coursesInMenu and Course
Course.hasMany(CoursesInMenu, {foreignKey:'course_ID'});
CoursesInMenu.belongsTo(Course, {foreignKey: 'course_ID'});

// relationship between courseCombination and menuItem
MenuItem.hasMany(CourseCombination, {foreignKey:'menuItem_ID'});
CourseCombination.belongsTo(MenuItem, {foreignKey: 'menuItem_ID'});


db.sync();






