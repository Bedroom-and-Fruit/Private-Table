var db = require('../config/dbConfig.js');
var Sequelize = require('sequelize');

var Venue = db.define('Venue',
  {
    venueName: Sequelize.STRING,
    address: Sequelize.STRING,
    city: Sequelize.STRING,
    state: Sequelize.STRING,
    zip: Sequelize.INTEGER,
    phone: Sequelize.STRING,
    fax: Sequelize.STRING,
    url: Sequelize.STRING,
    email: Sequelize.STRING,
    openTime: Sequelize.TIME,
    closeTime: Sequelize.TIME,
    contactFirstName: Sequelize.STRING,
    contactLastName: Sequelize.STRING,
    contactImage: Sequelize.STRING,
    contactTitle: Sequelize.STRING,
    taxRate: Sequelize.DECIMAL(10,2),
    autogratRate: Sequelize.DECIMAL,
    autogratMinGuests: Sequelize.INTEGER,
    cuisineType: Sequelize.STRING,
    houseRules: Sequelize.STRING,
    cancelPolicy: Sequelize.STRING,
    menuLeadTime: Sequelize.INTEGER
  }
);

db.sync();

module.exports = Venue;

