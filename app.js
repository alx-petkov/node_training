import express from 'express';
import cookieParser from 'cookie-parser';
import queryParser from 'query-parser-express';
import bodyParser from 'body-parser';
import router from './routes/routes';

/* import mongo from 'mongodb';
import mongoose from 'mongoose';
mongoose.connect('mongodb://localhost/loginapp');
const db = mongoose.connection; */

const app = express();

app.use(bodyParser.json(), cookieParser(), queryParser());

app.use('/', router);

app.get('/',(request,response)=>{
  response.send('Hello world app');
});

export default app;
