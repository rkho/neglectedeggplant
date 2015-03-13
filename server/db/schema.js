var Sequelize = require('sequelize');

var sequelize = new Sequelize('', '', '', {
  // host: 'localhost',
  dialect: 'mysql',
  storage: 'db/database.sqlite'
});

var User = sequelize.define('User', {
  email: { type: Sequelize.STRING(255), allowNull: false },
  origin: { type: Sequelize.STRING(3), allowNull: false },
  destination: { type: Sequelize.STRING(3), allowNull: false },
  budget: { type: Sequelize.FLOAT, allowNull: false },
  sent: { type: Sequelize.BOOLEAN, defaultValue: false },
}, {
  timestamps: true
});

// sequelize.sync().then(function(){
//   // User.create({
//   //   email: 'janedoe',
//   //   origin: 'LAX',
//   //   destination: 'SAN',
//   //   budget: 123.45
//   // });
// });

module.exports = User;
