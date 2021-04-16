import User from '../models/user.model.js';
import express from 'express';

const usersRouter = express.Router();

usersRouter.get('/:name', (req, res) => {
  User
    .findOne({ name: req.params.name })
    .then(user => {
      res.json(user);
    });
});

usersRouter.put('/:id', (req, res) => {


  const newItem = req.body._id;

  User
    .findByIdAndUpdate(req.params.id, { $push: { items: newItem } }, { new: true })
    .then(updatedUser => res.json(updatedUser))
})

export default usersRouter;