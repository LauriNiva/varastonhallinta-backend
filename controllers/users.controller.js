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
});

usersRouter.delete('/items/:id/:itemid', (req, res) => {
  console.log('usersItemDelete-id: ', req.params.id);
  console.log('usersItemDelete-itemid: ', req.params.itemid);

  User
    .findByIdAndUpdate(req.params.id, { $pull: { items: req.params.itemid  } })
    .then(() => res.status(204).end())

})

export default usersRouter;