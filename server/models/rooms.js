var db = require('../config/dbConfig.js');
var Sequelize = require('sequelize');
var Venue = require('./venue.js');

var Room = db.define('Room',
  {
    comment: Sequelize.STRING,
    unseenComment: Sequelize.BOOLEAN,
    commenter: Sequelize.INTEGER,
    contributionCommented: Sequelize.INTEGER

  }
);

db.sync();

module.exports = Room;