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


router.get('/api/products', function (req, res) {

  const allProducts = ProductCtr.getAll();
  console.log('all products: ', allProducts);  
  res.send('/api/products <br/>' + allProducts.replace(/;/g, '<br/>'));
})


router.get('/api/products/:id', function (req, res) {
  const SingleProduct = ProductCtr.getById(req.params.id); 
  console.log('product by ID', req.params.id, SingleProduct); 

  res.send('/api/products/:id <br/>' + SingleProduct);
  
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


router.get('/api/users', function (req, res) {
  const allUsers = UsersCtr.getAll(); 
  console.log('all users: ', allUsers);  
  res.send('/api/users <br/>' + allUsers.replace(/;/g, '<br/>'));
})


router.get('*', function (req, res) { 
  res.send('Page not found');
})

router.post('/auth', function (req, res) {
  const SingleProduct = ProductCtr.getById(req.params.id); 
  console.log('product by ID', req.params.id, SingleProduct); 

  res.send('/api/products/:id <br/>' + SingleProduct);
  
})

export default router;
