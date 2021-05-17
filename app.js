import config from './utils/config.js';
import express from 'express';
const app = express();
import cors from 'cors';
import usersRouter from './controllers/users.controller.js';
import mongoose from 'mongoose';
import storagesRouter from './controllers/storages.controller.js';
import itemsRouter from './controllers/items.controller.js';
import categoriesRouter from './controllers/categories.controller.js';

mongoose.connect(process.env.MONGODB_URI,
  { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
  .then(() => {
    console.log('connected to mongodb');
  })
  .catch((error) => {
    console.log('error conneting to db: ', error.message);
  })

  
app.use(cors());
app.use(express.json());

const requestLogger = (request, response, next) => {
  console.log("---");
  console.log("Method: ", request.method);
  console.log("Path: ", request.path);
  console.log("Body: ", request.body);
  console.log("---");
  next();
};

app.use(requestLogger);

app.use('/api/users', usersRouter);
app.use('/api/storages', storagesRouter);
app.use('/api/items', itemsRouter);
app.use('/api/categories', categoriesRouter);

export default app;