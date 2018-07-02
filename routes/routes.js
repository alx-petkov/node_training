import express from 'express';
import cookieMid from '../middlewares/cookies';
import queryMid from '../middlewares/queries';
import ProductCtr from '../controllers/products_controller';
import UsersCtr from '../controllers/users_controller';


const router = express.Router();

router.use(cookieMid, queryMid);


router.get('/', function (req, res) {
  console.log(req.parsedCookie, req.parsedQuery);
  res.send('Homepage route')
})

// define the home page route
router.get('/api/products', function (req, res) {

  const allProducts = ProductCtr.getAll();
  console.log('all products: ', allProducts);  
  res.send('/api/products <br/>' + allProducts.replace(/;/g, '<br/>'));
})
// define the about route
router.get('/api/products/:id', function (req, res) {
  const SingleProduct = ProductCtr.getById(req.params.id); 
  console.log('product by ID', req.params.id, SingleProduct); 
  res.send('/api/products/:id');
  
})

router.get('/api/products/:id/reviews', function (req, res) {
  res.send('/api/products/:id/reviews')
  console.log(req.params)
})

router.get('/api/products', function (req, res) {
  res.send('/api/products')
})

router.get('/api/users', function (req, res) {
  const allUsers = UsersCtr.getAll(); 
  console.log('all users: ', allUsers);  
  res.send('/api/users <br/>' + allUsers.replace(/;/g, '<br/>'));
})

export default router;
