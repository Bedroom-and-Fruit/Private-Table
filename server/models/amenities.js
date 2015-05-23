var db = require('../config/dbConfig.js');
var Sequelize = require('sequelize');

var Amenity = db.define('Amenity',
  {
    name: Sequelize.STRING
  }
);

db.sync();

module.exports = Amenity;