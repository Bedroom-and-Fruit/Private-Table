var db = require('../config/dbConfig.js');
var Sequelize = require('sequelize');
var Room = require('./rooms.js');
var User = require('./users.js');

var Booking = db.define('Booking',
  {
    start: Sequelize.DATE,
    end: Sequelize.DATE,
    room: Sequelize.INTEGER,
    booker: Sequelize.INTEGER
  }
);

db.sync();

module.exports = Booking;