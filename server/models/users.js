var db = require('../config/dbConfig.js');
var Sequelize = require('sequelize');
var bcrypt = require('bcrypt-nodejs');

var User = db.define('User',
  {

    username: Sequelize.STRING,
    email: Sequelize.STRING,
    password: Sequelize.STRING


  },

  {
    instanceMethods: {

      setPassword : function(newPassword, callback) {
        var self = this;
        bcrypt.hash(newPassword, null, null, function(err, hash){
          if (!err) {
            self.update({password: hash}).then(callback);
          }
        });
      },

      checkPassword: function(attemptedPassword) {
        return bcrypt.compareSync(attemptedPassword, this.get('password'));
      }
    }
  }
)

db.sync();

module.exports = User;
