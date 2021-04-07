import config from './utils/config';
import express from 'express';
const app = express();
import cors from 'cors';

import mongoose from 'mongoose';

mongoose.connect(process.env.MONGODB_URI,
{ useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true });


app.use(cors());
app.use(express.json());

export default app;