var db = require('../config/dbConfig.js');
var Sequelize = require('sequelize');
var Room = require('./rooms.js');

var Booking = db.define('Booking',
  {
    start: Sequelize.DATE,
    end: Sequelize.DATE,
    room: Sequelize.INTEGER
  }
);

db.sync();

module.exports = Booking;