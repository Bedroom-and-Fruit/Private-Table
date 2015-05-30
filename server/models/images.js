var db = require('../config/dbConfig.js');
var Sequelize = require('sequelize');
var Room = require('./rooms.js');

var Images = db.define('Images',
  {
    source: Sequelize.STRING,
    pictureOf: Sequelize.INTEGER
  }
);

db.sync();

module.exports = Images;