import express from 'express';
import cookieParser from 'cookie-parser';
import queryParser from 'query-parser-express';
import router from './routes/routes';

const app = express();

app.use(cookieParser(), queryParser());

app.use('/', router);

app.get('/',(request,response)=>{
  response.send('Hello world app');
});

export default app;
