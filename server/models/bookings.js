var db = require('../config/dbConfig.js');
var Sequelize = require('sequelize');
var Room = require('./rooms.js');

var Booking = db.define('Booking',
  {
    date: Sequelize.DATE,
    start: Sequelize.TIME,
    end: Sequelize.TIME,
    room: Sequelize.INTEGER
  }
);

db.sync();

module.exports = Booking;