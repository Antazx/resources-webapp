import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import path from 'path';

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

// Vue.js specific middleware
import history from 'connect-history-api-fallback';
app.use(history());
app.use(express.static(path.join(__dirname, 'public')));

app.set('port', process.env.PORT || devPort);
app.listen(app.get('port'), () => {
  console.log(`Server schema working on ${app.get('port')}`);
});
