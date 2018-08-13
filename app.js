import express from 'express';
import cookieParser from 'cookie-parser';
import queryParser from 'query-parser-express';
import bodyParser from 'body-parser';
import router from './routes/routes';
import passport from 'passport';
import passportConfig from './config/passport';
var expressValidator = require('express-validator');



const app = express();

app.use(
  bodyParser.json(), 
  cookieParser(), 
  queryParser(), 
  expressValidator()
  );

var swaggerUi = require('swagger-ui-express'),
    swaggerDocument = require('./api/swagger/swagger.json');

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
// http://localhost:8080/api-docs/

app.use('/', router);

app.get('/',(request,response)=>{
  response.send('Hello world app');
});

export default app;
