var db = require('../config/dbConfig.js');
var Sequelize = require('sequelize');
var MenuItem = require('./menuItems.js');

var CourseCombination = db.define('CourseCombination',
  {
    courseName: Sequelize.STRING,
    menuItem_ID: Sequelize.INTEGER
  }
);

db.sync();

module.exports = CourseCombination;