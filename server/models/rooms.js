var db = require('../config/dbConfig.js');
var Sequelize = require('sequelize');
var Venue = require('./venues.js');

var Room = db.define('Room',
  {
    name: Sequelize.STRING,   /*roomName*/
    type: Sequelize.STRING,
    size: Sequelize.INTEGER,
    description: Sequelize.TEXT,
    availForbanquet: Sequelize.BOOLEAN,  /*banquet*/
    banquetCapacity: Sequelize.INTEGER,
    availForreception: Sequelize.BOOLEAN,  /*reception*/
    receptionCapacity: Sequelize.INTEGER,
    minSpend: Sequelize.INTEGER,
    roomRentalFee: Sequelize.INTEGER,
    eventDuration: Sequelize.DECIMAL,
    durationOverageFee: Sequelize.INTEGER,
    parentVenue: Sequelize.INTEGER,
    cleaningFee: Sequelize.INTEGER,
    houseRules: Sequelize.STRING,
    cancelPolicy: Sequelize.STRING,
    /*heroImage: Sequelize.STRING*/
  }
);

db.sync();

module.exports = Room;
