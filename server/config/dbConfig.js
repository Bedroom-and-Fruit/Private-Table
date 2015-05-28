var Sequelize = require('sequelize');

// Here you replace someUsername and somePassword with your prefered mysql
// username and password.  If you would like to use something other than mysql,
// go for it.  Check out Sequelize's docs for more info:
// http://sequelize.readthedocs.org/en/latest/
if (process.env.HEROKU_POSTGRESQL_AMBER_URL) {
  var sequelize = new Sequelize(process.env.HEROKU_POSTGRESQL_AMBER_URL, {
    dialect: 'postgres',
    protocol: 'postgres',
    port: match[4],
    host: match[3],
    logging: true
  });
} else {
  var sequelize = new Sequelize('privatetabledb', 'root', '', {
    host: 'localhost',
    dialect: 'mysql',
  });
}

module.exports = sequelize;