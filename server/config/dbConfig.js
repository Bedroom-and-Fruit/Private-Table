var Sequelize = require('sequelize');
var fs = require('fs');

if (process.env.HEROKU_POSTGRESQL_AMBER_URL) {
  var sequelize = new Sequelize(process.env.HEROKU_POSTGRESQL_AMBER_URL, {
    dialect: 'postgres',
    protocol: 'postgres',
    port: match[4],
    host: match[3],
    logging: console.log
  });
} else {
  var username = String(fs.readFileSync(__dirname + '/databaseusername'));
  var password = String(fs.readFileSync(__dirname + '/databasepassword'));
  var databaseName = String(fs.readFileSync(__dirname + '/databasename'));
  var sequelize = new Sequelize(databaseName, username, password, {
    dialect: 'postgres',
    protocol: 'postgres',
    port: '5432',
    host: 'ec2-54-83-25-238.compute-1.amazonaws.com',
    logging: console.log,
    dialectOptions: {
      ssl: true
    }
  });
}

module.exports = sequelize;
