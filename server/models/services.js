var db = require('../config/dbConfig.js');
var Sequelize = require('sequelize');

var Service = db.define('Service',
  {
    name: Sequelize.STRING
  }
);

db.sync();

module.exports = Service;