var db = require('../config/dbConfig.js');
var Sequelize = require('sequelize');
var Room = require('./rooms.js');
var Amenity = require('./amenities.js');

var RoomAmenity = db.define('RoomAmenity',
  {
    amenities_ID: Sequelize.INTEGER,
    room_ID: Sequelize.INTEGER
  }
);

db.sync();

module.exports = RoomAmenity;