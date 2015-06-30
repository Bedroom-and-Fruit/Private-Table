var db = require('../config/dbConfig.js');
var Sequelize = require('sequelize');
var Room = require('./rooms.js');



var Layout = db.define('Layout',
  {
    name: Sequelize.STRING,
    room_ID: Sequelize.INTEGER,
    availForBanquet: Sequelize.BOOLEAN,
    banquetCapacity: Sequelize.INTEGER,
    availForReception: Sequelize.BOOLEAN,
    receptionCapacity: Sequelize.INTEGER
  }
);

db.sync();

module.exports = Layout;