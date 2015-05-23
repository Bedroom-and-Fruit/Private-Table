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

// relationship between room and image
Room.hasMany(Image, {foreignKey:'pictureOf'});
Image.belongsTo(Room, {foreignKey: 'pictureOf'});

// relationship between room and image
Room.hasMany(Image, {foreignKey:'pictureOf'});
Image.belongsTo(Room, {foreignKey: 'pictureOf'});

// relationship between room and image
Room.hasMany(Image, {foreignKey:'pictureOf'});
Image.belongsTo(Room, {foreignKey: 'pictureOf'});

// relationship between room and image
Room.hasMany(Image, {foreignKey:'pictureOf'});
Image.belongsTo(Room, {foreignKey: 'pictureOf'});

// relationship between room and image
Room.hasMany(Image, {foreignKey:'pictureOf'});
Image.belongsTo(Room, {foreignKey: 'pictureOf'});

// relationship between room and image
Room.hasMany(Image, {foreignKey:'pictureOf'});
Image.belongsTo(Room, {foreignKey: 'pictureOf'});

// relationship between room and image
Room.hasMany(Image, {foreignKey:'pictureOf'});
Image.belongsTo(Room, {foreignKey: 'pictureOf'});


