var db = require('../config/dbConfig.js');
var Sequelize = require('sequelize');

var Booking = db.define('Booking',
  {
    comment: Sequelize.STRING,
    unseenComment: Sequelize.BOOLEAN,
    commenter: Sequelize.INTEGER,
    contributionCommented: Sequelize.INTEGER

  }
);

db.sync();

module.exports = Booking;