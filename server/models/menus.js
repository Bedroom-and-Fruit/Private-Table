var db = require('../config/dbConfig.js');
var Sequelize = require('sequelize');
var Venue = require('./venue.js');

var Menu = db.define('Menu',
  {
    name: Sequelize.STRING,
    price: Sequelize.INTEGER,
    availForBanquet: Sequelize.BOOLEAN,
    availForReception: Sequelize.BOOLEAN,
    parentVenue: Sequelize.INTEGER
  }
);

db.sync();

module.exports = Menu;