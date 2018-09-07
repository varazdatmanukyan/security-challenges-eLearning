import Sequelize from 'sequelize';

const sequelize = new Sequelize('elearning', 'root', 'annie', {
  dialect: 'mysql',
  operatorsAliases: false,
  define: {
    underscored: true,
  },
});

sequelize.authenticate()
  .then(() => {
    console.log('Database connection has been established successfully.');
  })
  .catch(err => console.error('Unable to connect to the database:', err));

