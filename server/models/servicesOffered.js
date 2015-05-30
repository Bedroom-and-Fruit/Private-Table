var db = require('../config/dbConfig.js');
var Sequelize = require('sequelize');
var Service = require('./services.js');
var Room = require('./rooms.js');


var ServicesOffered = db.define('ServicesOffered',
  {
    service_ID: Sequelize.INTEGER,
    room_ID: Sequelize.INTEGER
  }
);

db.sync();

module.exports = ServicesOffered;