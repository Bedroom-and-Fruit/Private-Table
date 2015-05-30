var db = require('../config/dbConfig.js');
var Sequelize = require('sequelize');

var Service = db.define('Service',
  {
    id: Sequelize.INTEGER,
    name: Sequelize.STRING
  }
);

db.sync();

module.exports = Service;