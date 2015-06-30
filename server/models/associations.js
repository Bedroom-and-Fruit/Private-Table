var Booking = require('./bookings.js');
var Images = require('./images.js');
var Venue = require('./venues.js');
var Room = require('./rooms.js');
var Menu = require('./menus.js');
var MenuItem = require('./menuItems.js');
var db = require('../config/dbConfig.js');
var CourseCombination = require('./courseCombinations.js');
var CoursesInMenu = require('./coursesInMenus.js');
var RoomAmenity = require('./roomAmenities.js');
var Amenity = require('./amenities.js');
var User = require('./users.js');
var Favorite = require('./favorites.js');
var Layout = require ('./layouts.js');
var Service = require ('./services.js');
var MenusOffered = require ('./menusOffered.js');


//relationship between venue and room
Venue.hasMany(Room, {foreignKey: 'parentVenue'});
Room.belongsTo(Venue, {foreignKey: 'parentVenue'});

// relationship between room and image
Room.hasMany(Images, {foreignKey:'pictureOf'});
Images.belongsTo(Room, {foreignKey: 'pictureOf'});

// relationship between booking and room
Room.hasMany(Booking, {foreignKey:'room'});
Booking.belongsTo(Room, {foreignKey: 'room'});

// relationship between room and roomAmenity
Room.hasMany(RoomAmenity, {foreignKey:'room_ID'});
RoomAmenity.belongsTo(Room, {foreignKey: 'room_ID'});

// relationship between roomAmenity and amenity
Amenity.hasMany(RoomAmenity, {foreignKey:'amenities_ID'});
RoomAmenity.belongsTo(Amenity, {foreignKey: 'amenities_ID'});

// relationship between coursesInMenu and courseCombination
CourseCombination.hasMany(CoursesInMenu, {foreignKey:'courseCombination_ID'});
CoursesInMenu.belongsTo(CourseCombination, {foreignKey: 'courseCombination_ID'});

// relationship between coursesInMenu and menu
Menu.hasMany(CoursesInMenu, {foreignKey:'menu_ID'});
CoursesInMenu.belongsTo(Menu, {foreignKey: 'menu_ID'});

// relationship between courseCombination and menuItem
MenuItem.hasMany(CourseCombination, {foreignKey:'menuItem_ID'});
CourseCombination.belongsTo(MenuItem, {foreignKey: 'menuItem_ID'});

//relationship between user and booking
User.hasMany(Booking, {foreignKey:'booker'});
Booking.belongsTo(User, {foreignKey: 'booker'});

// relationship between service and room
Room.hasMany(Service, {foreignKey:'room_ID'});
Service.belongsTo(Room, {foreignKey: 'room_ID'});

// relationship between layout and room
Room.hasMany(Layout, {foreignKey:'room_ID'});
Layout.belongsTo(Room, {foreignKey: 'room_ID'});

// relationship between menusOffered and menu
Menu.hasMany(MenusOffered, {foreignKey:'menu_ID'});
MenusOffered.belongsTo(Menu, {foreignKey: 'menu_ID'});

// relationship between menusOffered and room
Room.hasMany(MenusOffered, {foreignKey:'room_ID'});
MenusOffered.belongsTo(Room, {foreignKey: 'room_ID'});

// relationship between favorite and user
User.hasMany(Favorite, {foreignKey:'user_ID'});
Favorite.belongsTo(User, {foreignKey: 'user_ID'});

// relationship between favorite and room
Room.hasMany(Favorite, {foreignKey:'room_ID'});
Favorite.belongsTo(Room, {foreignKey: 'room_ID'});


db.sync();






