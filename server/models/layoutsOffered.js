var db = require('../config/dbConfig.js');
var Sequelize = require('sequelize');
var Layout = require('./layouts.js');
var Room = require('./rooms.js');

var LayoutsOffered = db.define('LayoutsOffered',
  {
    layout_ID: Sequelize.INTEGER,
    room_ID: Sequelize.INTEGER
  }
);

db.sync();

module.exports = LayoutsOffered;