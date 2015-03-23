var Sequelize = require('sequelize');

var sequelize = new Sequelize(process.env['CLEAR_DB_DATABASE'], process.env['CLEAR_DB_USER'], process.env['CLEAR_DB_PW'], {
  host: process.env['CLEAR_DB_SERVER'],
  dialect: 'mysql'
  // dialectOptions: {
  // 	socketPath: '/Applications/MAMP/tmp/mysql/mysql.sock'
  // }
});

var User = sequelize.define('User', {
  email: { type: Sequelize.STRING(255), allowNull: false },
  phone: { type: Sequelize.STRING(255), allowNull: true },
  origin: { type: Sequelize.STRING(3), allowNull: false },
  destination: { type: Sequelize.STRING(3), allowNull: false },
  budget: { type: Sequelize.FLOAT, allowNull: false },
  sent: { type: Sequelize.BOOLEAN, defaultValue: false },
}, {
  timestamps: true
});

//sequelize.sync().then(function(err){
  // User.create({
  //   email: 'janedoe',
  //   origin: 'LAX',
  //   destination: 'SAN',
  //   budget: 123.45
  // });
//});

module.exports = User;
