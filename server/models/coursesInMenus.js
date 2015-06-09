var db = require('../config/dbConfig.js');
var Sequelize = require('sequelize');
var CourseCombination = require('./courseCombinations.js');
var Menu = require('./menus.js');

var CoursesInMenu = db.define('CoursesInMenu',
  {
    courseCombination_ID: Sequelize.INTEGER,
    courseOrder: Sequelize.INTEGER,
    menu_ID: Sequelize.INTEGER
  }
);

db.sync();

module.exports = CoursesInMenu;

