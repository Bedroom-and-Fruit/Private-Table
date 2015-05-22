var db = require('../config/dbConfig.js');
var Sequelize = require('sequelize');
var Venue = require('./venue.js');

var Menu = db.define('Menu',
  {
    comment: Sequelize.STRING,
    unseenComment: Sequelize.BOOLEAN,
    commenter: Sequelize.INTEGER,
    contributionCommented: Sequelize.INTEGER

  }
);

db.sync();

module.exports = Menu;