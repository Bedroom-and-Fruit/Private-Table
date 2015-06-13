var Sequelize = require('sequelize');
var fs = require('fs');

if (process.env.DATABASE_URL) {
  var match = process.env.DATABASE_URL.match(/postgres:\/\/([^:]+):([^@]+)@([^:]+):(\d+)\/(.+)/);
  var sequelize = new Sequelize(match[5], match[1], match[2], {
    dialect: 'postgres',
    protocol: 'postgres',
    port: match[4],
    host: match[3],
    logging: console.log,
    dialectOptions: {
      ssl: true
    }
  });
} else {
  var username = String(fs.readFileSync(__dirname + '/databaseusername'));
  var password = String(fs.readFileSync(__dirname + '/databasepassword'));
  var databaseName = String(fs.readFileSync(__dirname + '/databasename'));
  var host = String(fs.readFileSync(__dirname + '/host'));
  var sequelize = new Sequelize(databaseName, username, password, {
    dialect: 'postgres',
    protocol: 'postgres',
    port: '5432',
    host: host,
    logging: console.log,
    dialectOptions: {
      ssl: true
    }
  });
}

module.exports = sequelize;


