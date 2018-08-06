import express from 'express';
import cookieMid from '../middlewares/cookies';
import queryMid from '../middlewares/queries';
// import verifyToken from '../middlewares/tokens';
// import ProductCtr from '../controllers/products_controller';
// import UsersCtr from '../controllers/users_controller';
import { notFound, loggedIn } from '../constants/responces';
var jwt = require('jsonwebtoken');
import passport from 'passport';
import Cities from '../models/Cities';
import Users from '../models/Users';
import Products from '../models/Products';


const router = express.Router();
router.use(cookieMid, queryMid);


// ===== CITY ROUTES =============================

router.get('/', function (req, res) {
  // Return random city
  const index = (Math.floor(Math.random() * 12) + 1) - 1;
  
  /*Cities.getAll(async(results) => {
    await res.send(results[index]);
  });*/

  Cities.mgGetAll((results) => {
    res.send(results[index]);
  });

})

router.get('/api/cities', function (req, res) {
  Cities.mgGetAll((results) => {
    res.send(results);
  });
})

router.post('/api/cities', function (req, res) {
  // toDo validation
  const newCity = {
    name: req.body.name,
    country: req.body.country,
    capital: req.body.capital,
    latitude: req.body.latitude,
    longitude: req.body.longitude,
    timezone: req.body.timezone
  }
  Cities.createNew(newCity, (results) => {
    res.send(results);
  });
})

router.put('/api/cities/:id', function (req, res) {
  Cities.updateById(req.params.id, data, (results) => {
    res.send(results);
  });
})

router.delete('/api/cities/:id', function (req, res) {
  Cities.deleteById(req.params.id, (results) => {
    res.send(results);
  });
})

// ====== PRODUCT ROUTES ============================

router.get('/api/products', function (req, res) {
  Products.getAll((results) => {
      res.send(results);
  });
})


router.get('/api/products/:id', function (req, res) {
  Products.getById(req.params.id, (result) => {
      res.send(result);
  });   
})


router.get('/api/products/:id/reviews', function (req, res) {
  const SingleProduct = ProductCtr.getById(req.params.id); 
  const productReviews = ProductCtr.getReviews(req.params.id);  
  console.log('product reviews for ', SingleProduct, productReviews);
  res.send('/api/products/:id/reviews <br/>' + SingleProduct + 
  '<br/> reviews <br/>' + productReviews.replace(/;/g, '<br/>'));
  
})


router.post('/api/products', function (req, res) {
    console.log('request', req.body);
    const newProduct = ProductCtr.addNew(req.body);
    console.log('adding new product: ', newProduct);
    res.send('/api/products' + newProduct.name + 'added');
})

router.delete('/api/products/:id', function (req, res) {
  Products.deleteById(req.params.id, (results) => {
    res.send(results);
  });
})


// ====== USER ROUTES =============================

router.get('/api/users', function (req, res) {
    Users.getAll((results) => {
      res.send(results);
  });
})

router.delete('/api/users/:id', function (req, res) {
  Users.deleteById(req.params.id, (results) => {
    res.send(results);
  });
})


router.get('*', function (req, res) { 
  res.send('Page not found');
})


export default router;
