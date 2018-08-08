/* const Sequelize = require('sequelize');
import connection from '../config/postgres';
import products from '../constants/Products';

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


const Product = connection.define('product', {
  name: { 
    type: Sequelize.STRING,
    unique: true,
    allowNull: false
  },
  price: { 
    type: Sequelize.INTEGER,
    defaultValue: 0 
  }
})


connection.sync({ force: true }).then(() => {
  return Product.bulkCreate(
    products
  )
}).then(() => {
  return Product.findAll();
}).then(prods => {
  prods.forEach((pd) => {
    console.log('found', pd.dataValues);
  })
}).catch(err => {
    console.error('Unable to connect to the database:', err);
  });


Product.sync({ force: true }).then(() => {
  return Product.bulkCreate(
    products
  )
}).then(() => {
  return Product.findAll();
}).then(prods => {
  console.log('found', prods)
})

export default Product; */
