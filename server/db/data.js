var Sequelize = require('sequelize-sqlite').sequelize;
var sqlite = require('sequelize-sqlite').sqlite;
var sequelize = new Sequelize('database', 'username', 'password', {
  dialiect: 'sqlite',
  storage:  'file:data.db'
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


sequelize
  .sync()
  .success(function() {
    console.log('Synced');
  });

sequelize
  .authenticate()
  .complete(function(err) {
    if (!!err) {
      console.log('Unable to connect to the database:', err)
    } else {
      console.log('Connection has been established successfully.')
    }
  });
