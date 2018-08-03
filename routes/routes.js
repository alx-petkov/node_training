import express from 'express';
import cookieMid from '../middlewares/cookies';
import queryMid from '../middlewares/queries';
import verifyToken from '../middlewares/tokens';
import ProductCtr from '../controllers/products_controller';
import UsersCtr from '../controllers/users_controller';
import { notFound, loggedIn } from '../constants/responces';
var jwt = require('jsonwebtoken');
import passport from 'passport';
import Cities from '../models/Cities'

const mongo = require('mongodb');
const MongoClient = require('mongodb').MongoClient;


const router = express.Router();

router.use(cookieMid, queryMid);






router.post('/auth', function(req, res) {
  const user = UsersCtr.authUser(req.body.username, req.body.password);

  if(user){
    jwt.sign({ user }, 'secretKey', (err, token) => {
      if(err) { 
        console.log('jwt error', err); 
      } else {
        console.log(loggedIn);
        loggedIn.data.user = { username: user.username, email: user.email };
        loggedIn.token = token; 
        res.send({loggedIn});
      }
    })
  } else {
    res.send(notFound);
  }
})

router.post('/passport', passport.authenticate('local', { session: false }), function(req, res) {
  res.send({ authenticated: true });
})

router.get('/', function (req, res) {
  console.log(req.parsedCookie, req.parsedQuery);

  Cities.getAll(res);
  console.log(test);


  // ===================================

  /* mongo.connect('mongodb://127.0.0.1:27017', (err, dbp) => {
  if(err) { console.log(err); }
  const dba = dbp.db('node_tr');
  const cursor = dba.collection('cities').find({});
  console.log('cursor', cursor);
  // const result = cursor.toArray();
  cursor.forEach((doc, err)=>{
  if(err){ console.log(err); }
    console.log('document', doc);
  }, () => {
    
   dbp.close();
  })

  });*/

  // ============================================

  /* MongoClient.connect('mongodb://127.0.0.1:27017', (err, database) => {
  if(err) { console.log(err); }
  const db = database.db('node_tr');
  const cursor = db.collection('cities').find();

    cursor.toArray((err, results) => {
      if(err){ console.log(err); }
      console.log('results', results);
      }, () => {
    
      database.close();
    })
  })*/

  // ============================================

  // res.send('Homepage route')
})


router.get('/api/products', verifyToken, function (req, res) {
  const allProducts = ProductCtr.getAll();
  console.log('all products: ', allProducts);  
  res.send('/api/products <br/>' + allProducts.replace(/;/g, '<br/>'));
})


router.get('/api/products/:id', verifyToken, function (req, res) {
  const SingleProduct = ProductCtr.getById(req.params.id); 
  console.log('product by ID', req.params.id, SingleProduct); 

  res.send('/api/products/:id <br/>' + SingleProduct);
  
})


router.get('/api/products/:id/reviews', verifyToken, function (req, res) {
  const SingleProduct = ProductCtr.getById(req.params.id); 
  const productReviews = ProductCtr.getReviews(req.params.id);  
  console.log('product reviews for ', SingleProduct, productReviews);
  res.send('/api/products/:id/reviews <br/>' + SingleProduct + 
  '<br/> reviews <br/>' + productReviews.replace(/;/g, '<br/>'));
  
})


router.post('/api/products', verifyToken, function (req, res) {
    console.log('request', req.body);
    const newProduct = ProductCtr.addNew(req.body);
    console.log('adding new product: ', newProduct);
    res.send('/api/products' + newProduct.name + 'added');
})


router.get('/api/users', verifyToken, function (req, res) {
  const allUsers = UsersCtr.getAll(); 
  console.log('all users: ', allUsers);  
  res.send('/api/users <br/>' + allUsers.replace(/;/g, '<br/>'));
})


router.get('*', function (req, res) { 
  res.send('Page not found');
})


export default router;
