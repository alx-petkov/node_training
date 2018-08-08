const Sequelize = require('sequelize');


// need to create node_tr database first
const connection = new Sequelize('node_tr', 'postgres', 'epam', {
  host: 'localhost',
  dialect: 'postgres'
})

connection
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

export default connection;