import express from 'express';
const router = express.Router();


router.get('/', function (req, res) {
  res.send('Homepage route')
})

// define the home page route
router.get('/api/products', function (req, res) {
  res.send('/api/products')
})
// define the about route
router.get('/api/products/:id', function (req, res) {
  res.send('/api/products/:id');
  console.log(req.params)
})

router.get('/api/products/:id/reviews', function (req, res) {
  res.send('/api/products/:id/reviews')
  console.log(req.params)
})

router.get('/api/products', function (req, res) {
  res.send('/api/products')
})

router.get('/api/users', function (req, res) {
  res.send('/api/users');
})

export default router;