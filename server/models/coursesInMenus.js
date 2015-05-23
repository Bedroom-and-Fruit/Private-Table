var db = require('../config/dbConfig.js');
var Sequelize = require('sequelize');
var Course = require('./courses.js');
var Menu = require('./menus.js');

var CoursesInMenu = db.define('CoursesInMenu',
  {
    course_ID: Sequelize.INTEGER,
    menu_ID: Sequelize.INTEGER
  }
);

db.sync();

module.exports = CoursesInMenu;

