var db = require('../config/dbConfig.js');
var Sequelize = require('sequelize');

var Course = db.define('Course',
  {
    name: Sequelize.STRING,
  }
);

db.sync();

module.exports = Course;