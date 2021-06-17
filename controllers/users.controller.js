import User from '../models/user.model.js';
import express from 'express';
import bcrypt from 'bcrypt';

const usersRouter = express.Router();

usersRouter.post('/', async (req, res) => {
  const body = req.body;

  const passwordHash = await bcrypt.hash(body.password, 10);

  const user = new User({
    username: body.username,
    name: body.name,
    passwordHash,
  });

  const savedUser = await user.save();

  res.json(savedUser);
});

usersRouter.get('/:username', (req, res) => {
  User
    .findOne({ username: req.params.username })
    .then(user => {
      res.json(user);
    });
});

usersRouter.delete('/items/:id/:itemid', (req, res) => {
  User
    .findByIdAndUpdate(req.params.id, { $pull: { items: req.params.itemid } })
    .then(() => res.status(204).end());
});

//Add new storage to the user
usersRouter.put('/storages/:id', (req, res) => {
  const newStorage = req.body._id;

  User
    .findByIdAndUpdate(req.params.id, { $push: { storages: newStorage } }, { new: true })
    .then(updatedUser => res.json(updatedUser));
});

usersRouter.delete('/storages/:id/:storageid', (req, res) => {
  User.findByIdAndUpdate(req.params.id, { $pull: { storages: req.params.storageid } })
    .then(() => res.status(204).end());
});

//Add new category to the user
usersRouter.put('/categories/:id', (req, res) => {
  const newCategory = req.body._id;

  User
    .findByIdAndUpdate(req.params.id, { $push: { categories: newCategory } }, { new: true })
    .then(updatedUser => res.json(updatedUser));
});

usersRouter.delete('/categories/:id/:categoryid', (req, res) => {
  User.findByIdAndUpdate(req.params.id, { $pull: { categories: req.params.categoryid } })
    .then(() => res.status(204).end());
});


export default usersRouter;