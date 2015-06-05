var db = require('../config/dbConfig.js');
var Sequelize = require('sequelize');

var Menu = db.define('Menu',
  {
    name: Sequelize.STRING,
    price: Sequelize.INTEGER,
    banquet: Sequelize.BOOLEAN,
    reception: Sequelize.BOOLEAN,
  }
);

db.sync();

module.exports = Menu;