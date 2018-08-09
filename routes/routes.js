import express from 'express';
import cookieMid from '../middlewares/cookies';
import queryMid from '../middlewares/queries';
import ProductCtr from '../controllers/products_controller';
import UsersCtr from '../controllers/users_controller';
import { notFound, loggedIn } from '../constants/responces';
// import Product from '../models/Products';
// import User from '../models/Users';
// import Reviews from '../models/Reviews';
import { Product, User, Review } from '../config/postgres';


const router = express.Router();

router.use(cookieMid, queryMid);

router.get('/', function (req, res) {
  console.log(req.parsedCookie, req.parsedQuery);
  res.send('Homepage route')
})


router.get('/api/products', function (req, res) {
  Product.findAll()
    .then(prods => {
      res.send(prods);
    })
    .catch(err => {
      console.error('error', err);
      res.send('Unable to retrieve items')
    });
})


router.get('/api/products/:id', function (req, res) {
  Product.findById(req.params.id)
    .then(prod => {
      res.send(prod);
    })
    .catch(err => {
      console.error('error', err);
      res.send('Unable to retrieve item')
    });
})


router.get('/api/products/:id/reviews', function (req, res) {
  let productName = '';

  Product.findById(req.params.id)
    .then(prod => {
      productName = prod.name;

      return  Review.findAll({ 
        where: { productId: req.params.id }
      })
    }).then(reviews => {
      const response = Object.assign({}, { data: reviews }, { productName });
      res.send(response);
    })
    .catch(err => {
      console.error('error', err);
      res.send('Unable to retrieve items')
    });;  
})


router.post('/api/products', function (req, res) {
    const newProduct = {
      name: req.body.name,
      price: req.body.price
    }

    Product.create(newProduct)
      .then((newItem) => {
        res.send(newItem);
        console.log('New product added');
      })
      .catch(err => {
        console.error('error', err);
        res.send('Unable to create item')
      });
}) 


router.get('/api/users', function (req, res) {
    User.findAll()
      .then(prods => {
        res.send(prods);
      })
      .catch(err => {
        console.error('error', err);
        res.send('Unable to retrieve item')
      });
})


router.get('*', function (req, res) { 
  res.send('Page not found');
})


export default router;
