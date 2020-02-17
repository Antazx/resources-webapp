import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import path from 'path';
import mongoose from 'mongoose';

/* const uri = '';
const options = { useNewUrlParser: true, useCreateIndex: true };

mongoose.connect(uri, options).then(
  () => {
    console.log('Conected to mongoDB');
  },
  (err) => {
    console.log(err);
  }
); */

const devPort = 3000;

const app = express();

// Setting middlewares
app.use(morgan('tiny'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.get('/', (request, response) => {
  response.send(`<h1>Hello world</h1>`);
});

app.post('/login', async (request, response) => {
  const body = request.body;
  try {
    console.log(body);
    //log against ldap server
  } catch (error) {
    console.log(error);
  }
});

// Vue.js specific middleware
import history from 'connect-history-api-fallback';
app.use(history());
app.use(express.static(path.join(__dirname, 'public')));

app.set('port', process.env.PORT || devPort);
app.listen(app.get('port'), () => {
  console.log(`Server schema working on http://localhost:${app.get('port')}`);
});
