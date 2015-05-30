var db = require('../config/dbConfig.js');
var Sequelize = require('sequelize');
var Room = require('./rooms.js');
var User = require('./users.js');



var Favorite = db.define('Favorite',
  {
    user_ID: Sequelize.INTEGER,
    room_ID: Sequelize.INTEGER
  }
);

db.sync();

module.exports = Favorite;