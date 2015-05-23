var db = require('../config/dbConfig.js');
var Sequelize = require('sequelize');
var Room = require('./rooms.js');

var Image = db.define('Image',
  {
    source: Sequelize.STRING,
    pictureOf: Sequelize.INTEGER
  }
);

db.sync();

module.exports = Image;