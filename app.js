import express from 'express';
import cookieParser from 'cookie-parser';
import queryParser from 'query-parser-express';
import bodyParser from 'body-parser';
import router from './routes/routes';
const Sequelize = require('sequelize');
import products from './constants/Products';

console.log(products);

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
  name: { type: Sequelize.STRING},
  price: { type: Sequelize.INTEGER }
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
  // console.log('found', prods) // the 'programming' tasks will both have a status of 'inactive'
})

/*Product.sync({ force: true }).then(() => {
  return Product.bulkCreate(
    products
  )
}).then(() => {
  return Product.findAll();
}).then(prods => {
  console.log('found', prods) // the 'programming' tasks will both have a status of 'inactive'
})*/




const app = express();

app.use(bodyParser.json(), cookieParser(), queryParser());

app.use('/', router);

app.get('/',(request,response)=>{
  response.send('Hello world app');
});

export default app;
