var Booking = require('./bookings.js');
var Image = require('./images.js');
var Venue = require('./venue.js');
var Room = require('./rooms.js');
var Course = require('./courses.js');
var Menu = require('./menus.js');
var MenuItem = require('./menuItems.js');
var db = require('../config/dbConfig.js');

//relationship between venue and room
Venue.hasMany(Room, {foreignKey: 'venue_id'});
Room.belongsTo(Venue, {foreignKey: 'venue_id'});

//relationship between venue and menu
Venue.hasMany(Menu, {foreignKey:'venue'});
Menu.belongsTo(Venue, {foreignKey: 'venue'});

// relationship between room and image
Room.hasMany(Image, {foreignKey:'room'});
Image.belongsTo(Room, {foreignKey: 'room'});

