var db = require('../config/dbConfig.js');
var Sequelize = require('sequelize');

var Venue = db.define('Venue',
  {
    name: Sequelize.STRING,
    address: Sequelize.STRING,
    city: Sequelize.STRING,
    state: Sequelize.STRING,
    zip: Sequelize.INTEGER,
    phone: Sequelize.INTEGER,
    fax: Sequelize.INTEGER,
    url: Sequelize.STRING,
    email: Sequelize.STRING,
    openTime: Sequelize.TIME,
    closeTime: Sequelize.TIME,
    contactFirstName: Sequelize.STRING,
    contactLastName: Sequelize.STRING,
    contactTitle: Sequelize.STRING,
    taxRate: Sequelize.DECIMAL,
    autogratRate: Sequelize.DECIMAL,
    autogratMinGuests: Sequelize.INTEGER,
    cuisineType: Sequelize.STRING,
    houseRules: Sequelize.STRING,
    cancelPolicy: Sequelize.STRING,
    menuLeadTime: sequelize.INTEGER
  }
);

db.sync();

module.exports = Venue;

















