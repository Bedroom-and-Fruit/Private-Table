var db = require('../config/dbConfig.js');
var Sequelize = require('sequelize');
var Course = require('./courses.js');
var MenuItem = require('./menuItems.js');

var CourseCombination = db.define('CourseCombination',
  {
    course_ID: Sequelize.INTEGER,
    menuItem_ID: Sequelize.INTEGER
  }
);

db.sync();

module.exports = CourseCombination;