/* const Sequelize = require('sequelize');
import connection from '../config/postgres';
import reviews from '../constants/Reviews';

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


const Review = connection.define('review', {
  productId: { 
    type: Sequelize.INTEGER,
    // unique: true,
    allowNull: false
  },
  reviews: { 
    type: Sequelize.ARRAY(Sequelize.TEXT),
    allowNull: false
  },
})


connection.sync({ force: true }).then(() => {
  return Review.bulkCreate(
    reviews
  )
}).catch(err => {
    console.error('Unable to connect to the database:', err);
  });


export default Review; */
