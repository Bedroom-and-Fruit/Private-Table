var db = require('../config/dbConfig.js');
var Sequelize = require('sequelize');

var Venue = db.define('Venue',
  {
    comment: Sequelize.STRING,
    unseenComment: Sequelize.BOOLEAN,
    commenter: Sequelize.INTEGER,
    contributionCommented: Sequelize.INTEGER

  }
);

db.sync();

module.exports = Venue;