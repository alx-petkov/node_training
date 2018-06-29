import express from 'express';
import router from './routes/routes';
const app = express();

app.use('/', router);

app.get('/',(request,response)=>{
  response.send('Hello world app');
});

export default app;
