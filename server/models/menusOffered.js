var db = require('../config/dbConfig.js');
var Sequelize = require('sequelize');
var Room = require('./rooms.js');
var Menu = require('./menus.js');

var MenusOffered = db.define('MenusOffered',
  {
    menu_ID: Sequelize.INTEGER,
    room_ID: Sequelize.INTEGER
  }
);

db.sync();

module.exports = MenusOffered;