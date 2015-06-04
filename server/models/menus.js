var db = require('../config/dbConfig.js');
var Sequelize = require('sequelize');
var Venue = require('./venues.js');

var Menu = db.define('Menu',
  {
    name: Sequelize.STRING,
    price: Sequelize.INTEGER,
    banquet: Sequelize.BOOLEAN,
    reception: Sequelize.BOOLEAN,
    parentRoom: Sequelize.INTEGER
  }
);

db.sync();

module.exports = Menu;