var db = require('../config/dbConfig.js');
var Sequelize = require('sequelize');

var MenuItem = db.define('MenuItem',
  {
    name: Sequelize.STRING,
    description: Sequelize.TEXT,
    minGuests: Sequelize.INTEGER,
    serviceStyle: Sequelize.STRING
  }
);

db.sync();

module.exports = MenuItem;