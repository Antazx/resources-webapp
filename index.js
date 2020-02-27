import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import path from 'path';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import User from './models/users';
import GlobalConfig from './configs/config';
import userRoutes from './routes/userRoutes';

const uri = GlobalConfig.databaseuri;
const options = GlobalConfig.databaseOptions;
const devPort = GlobalConfig.devPort;
dotenv.config({ path: path.join(__dirname, './.env') });
// mirar lo de .env

mongoose.connect(uri, options).then(
  () => {
    console.log('Conected to mongoDB');
  },
  err => {
    console.log(err);
  }
);

const app = express();
app.set('port', process.env.PORT || devPort);
app.set('jwt-key', GlobalConfig.jwtSecretkey || 'default');

// Setting middlewares
app.use(morgan('tiny'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(async (req, res, next) => {
  if (req.headers['x-access-token']) {
    const accesToken = req.headers['x-access-token'];
    const { userId, exp } = await jwt.verify(accesToken, process.env.JWT_SECRET);

    if (exp < Date.now().valueOf() / 1000)
      return res.status(401).json({ error: 'JWT token has expired, please login again' });

    res.locals.loggedInUser = await User.findById(userId);
    next();
  } else {
    next();
  }
});

app.use('/', userRoutes);

//Simple error handling
app.use((err, req, res) => {
  console.error('SSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS');
  if (!err.statusCode) err.statusCode = 500;
  res.status(err.statusCode).send(err.message);
});

// Vue.js specific middleware
import history from 'connect-history-api-fallback';
app.use(history());
app.use(express.static(path.join(__dirname, 'public')));

app.listen(app.get('port'), () => {
  console.log(`Server schema working on http://localhost:${app.get('port')}`);
});
