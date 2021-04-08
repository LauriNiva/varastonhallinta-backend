import User from '../models/user.model'; 
import express, { Router } from 'express';

const userRouter = express.Router();

userRouter.get('/:name', (req, res) => {
  User
  .findOne({ name: req.params.name})
  .then(user => {
    res.json(user);
  });
});

export default userRouter;