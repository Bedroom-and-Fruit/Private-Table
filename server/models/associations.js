var Booking = require('./bookings.js');
var Images = require('./images.js');
var Venue = require('./venues.js');
var Room = require('./rooms.js');
var Course = require('./courses.js');
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
var LayoutsOffered = require ('./layoutsOffered.js');
var Service = require ('./services.js');



//relationship between venue and room
Venue.hasMany(Room, {foreignKey: 'parentVenue'});
Room.belongsTo(Venue, {foreignKey: 'parentVenue'});

//relationship between room and menu
Room.hasMany(Menu, {foreignKey:'parentRoom'});
Menu.belongsTo(Room, {foreignKey: 'parentRoom'});

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

// relationship between courseCombination and course
Course.hasMany(CourseCombination, {foreignKey:'course_ID'});
CourseCombination.belongsTo(Course, {foreignKey: 'course_ID'});

// relationship between coursesInMenu and menu
Menu.hasMany(CoursesInMenu, {foreignKey:'menu_ID'});
CoursesInMenu.belongsTo(Menu, {foreignKey: 'menu_ID'});

// relationship between coursesInMenu and course
Course.hasMany(CoursesInMenu, {foreignKey:'course_ID'});
CoursesInMenu.belongsTo(Course, {foreignKey: 'course_ID'});

// relationship between courseCombination and menuItem
MenuItem.hasMany(CourseCombination, {foreignKey:'menuItem_ID'});
CourseCombination.belongsTo(MenuItem, {foreignKey: 'menuItem_ID'});

//relationship between user and booking
User.hasMany(Booking, {foreignKey:'booker'});
Booking.belongsTo(User, {foreignKey: 'booker'});

// relationship between service and room
Room.hasMany(Service, {foreignKey:'room_ID'});
Service.belongsTo(Room, {foreignKey: 'room_ID'});

// relationship between layoutsOffered and layout
Layout.hasMany(LayoutsOffered, {foreignKey:'layout_ID'});
LayoutsOffered.belongsTo(Layout, {foreignKey: 'layout_ID'});

// relationship between layoutsOffered and room
Room.hasMany(LayoutsOffered, {foreignKey:'room_ID'});
LayoutsOffered.belongsTo(Room, {foreignKey: 'room_ID'});

// relationship between favorite and user
User.hasMany(Favorite, {foreignKey:'user_ID'});
Favorite.belongsTo(User, {foreignKey: 'user_ID'});

// relationship between favorite and room
Room.hasMany(Favorite, {foreignKey:'room_ID'});
Favorite.belongsTo(Room, {foreignKey: 'room_ID'});


db.sync();






