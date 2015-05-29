var db = require('../config/dbConfig.js');
var Sequelize = require('sequelize');
var Venue = require('./venues.js');

var Room = db.define('Room',
  {
    roomName: Sequelize.STRING,
    type: Sequelize.STRING,
    size: Sequelize.INTEGER,
    description: Sequelize.TEXT,
    banquet: Sequelize.BOOLEAN,
    banquetCapacity: Sequelize.INTEGER,
    reception: Sequelize.BOOLEAN,
    receptionCapacity: Sequelize.INTEGER,
    minSpend: Sequelize.INTEGER,
    roomRentalFee: Sequelize.INTEGER,
    eventDuration: Sequelize.INTEGER,
    durationOverageFee: Sequelize.INTEGER,
    parentVenue: Sequelize.INTEGER,
    cleaningFee: Sequelize.INTEGER,
    houseRules: Sequelize.STRING,
    cancelPolicy: Sequelize.STRING,
    heroImage: Sequelize.STRING
  }
);

db.sync();

module.exports = Room;
