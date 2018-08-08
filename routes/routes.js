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
// import connection from '../config/postgres';

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
    // prods.forEach((pd) => {
    //   console.log('aaaa', pd.dataValues);
    // });
  }); // toDo error handling
})


router.get('/api/products/:id', function (req, res) {
  Product.findById(req.params.id)
  .then(prod => {
    res.send(prod);
    // prods.forEach((pd) => {
    //   console.log('aaaa', pd.dataValues);
    // });
  }); // toDo error handling
})


router.get('/api/products/:id/reviews', function (req, res) {
  let response = {};

  Review.findAll({ where: { productId: req.params.id}})
  .then(prod => {
    // response = Object.assign(response, { reviews: prod.reviews });
    // response.reviews = prod.reviews;
    // return Product.findById(req.params.id)
    res.send(prod);
    // prods.forEach((pd) => {
    //   console.log('aaaa', pd.dataValues);
    // });
  // }).then(prod => {
    // response.product = prod.prod;
    // res.send(Object.assign(response, { product: prod } ));
  });

  /* const SingleProduct = ProductCtr.getById(req.params.id); 
  const productReviews = ProductCtr.getReviews(req.params.id);  
  console.log('product reviews for ', SingleProduct, productReviews);
  res.send('/api/products/:id/reviews <br/>' + SingleProduct + 
  '<br/> reviews <br/>' + productReviews.replace(/;/g, '<br/>')); */
  
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
    }) // toDo error handling
}) 


router.get('/api/users', function (req, res) {
    User.findAll()
      .then(prods => {
        res.send(prods);
        // prods.forEach((pd) => {
        //   console.log('aaaa', pd.dataValues);
        // });
      }); // toDo error handling
})


router.get('*', function (req, res) { 
  res.send('Page not found');
})


export default router;
