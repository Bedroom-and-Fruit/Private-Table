var db = require('../config/dbConfig.js');
var Sequelize = require('sequelize');
var Room = require('./rooms.js');

var Service = db.define('Service',
  {
    name: Sequelize.STRING,
    room_ID: Sequelize.INTEGER,
    description: Sequelize.TEXT,
    price: Sequelize.INTEGER,
    pricedPer: Sequelize.STRING,
    limit: Sequelize.INTEGER,
    limitOverageFee: Sequelize.INTEGER,
    limitOveragePricedPer: Sequelize.STRING
  }
);

db.sync();

module.exports = Service;