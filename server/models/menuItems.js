var db = require('../config/dbConfig.js');
var Sequelize = require('sequelize');

var MenuItem = db.define('MenuItem',
  {
    comment: Sequelize.STRING,
    unseenComment: Sequelize.BOOLEAN,
    commenter: Sequelize.INTEGER,
    contributionCommented: Sequelize.INTEGER

  }
);

db.sync();

module.exports = MenuItem;