/* const Sequelize = require('sequelize');
import connection from '../config/postgres';
import users from '../constants/Users';

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


const User = connection.define('user', {
  first_name: { 
    type: Sequelize.STRING,
    allowNull: false
  },
  last_name: { 
    type: Sequelize.STRING,
    allowNull: false
  },
  username: { 
    type: Sequelize.STRING,
    unique: true,
    allowNull: false
  },
  password: { 
    type: Sequelize.STRING,
    allowNull: false
  },
  email: { 
    type: Sequelize.STRING,
    unique: true,
    allowNull: false
  }
})


connection.sync({ force: true }).then(() => {
  return User.bulkCreate(
    users
  )
}).catch(err => {
    console.error('Unable to connect to the database:', err);
  });


export default User; */
