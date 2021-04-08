import User from '../models/user.model.js'; 
import express, { Router } from 'express';

const usersRouter = express.Router();

usersRouter.get('/:name', (req, res) => {
  User
  .findOne({ name: req.params.name})
  .then(user => {
    res.json(user);
  });
});

export default usersRouter;