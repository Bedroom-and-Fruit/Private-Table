var db = require('../config/dbConfig.js');
var Sequelize = require('sequelize');

var Course = db.define('Course',
  {
    comment: Sequelize.STRING,
    unseenComment: Sequelize.BOOLEAN,
    commenter: Sequelize.INTEGER,
    contributionCommented: Sequelize.INTEGER

  }
);

db.sync();

module.exports = Course;