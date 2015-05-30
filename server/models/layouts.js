var db = require('../config/dbConfig.js');
var Sequelize = require('sequelize');



var Layout = db.define('Layout',
  {
    name: Sequelize.STRING,
    capacity: Sequelize.INTEGER
  }
);

db.sync();

module.exports = Layout;