import config from './utils/config.js';
import express from 'express';
import 'express-async-errors';
const app = express();
import cors from 'cors';
import usersRouter from './controllers/users.controller.js';
import mongoose from 'mongoose';
import storagesRouter from './controllers/storages.controller.js';
import itemsRouter from './controllers/items.controller.js';
import categoriesRouter from './controllers/categories.controller.js';
import loginRouter from './controllers/login.controller.js';
import middlewares from './utils/middlewares.js';


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

app.use(middlewares.requestLogger);
app.use(middlewares.tokenExtractor);

app.use('/api/user', usersRouter);

// app.use('/api/storages',  storagesRouter);
// app.use('/api/items',  itemsRouter);
// app.use('/api/categories', categoriesRouter);

app.use('/api/storages', middlewares.userExtractor, storagesRouter);
app.use('/api/items', middlewares.userExtractor, itemsRouter);
app.use('/api/categories', middlewares.userExtractor, categoriesRouter);
app.use('/api/login', loginRouter);
app.use(middlewares.errorHandler);

export default app;