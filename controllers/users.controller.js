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

usersRouter.put('/items/:id', (req, res) => {
  const newItem = req.body._id;

  User
    .findByIdAndUpdate(req.params.id, { $push: { items: newItem } }, { new: true })
    .then(updatedUser => res.json(updatedUser))
});

usersRouter.delete('/items/:id/:itemid', (req, res) => {
  User
    .findByIdAndUpdate(req.params.id, { $pull: { items: req.params.itemid } })
    .then(() => res.status(204).end());
});

usersRouter.put('/storages/:id', (req, res) => {
  const newStorage = req.body._id;

  User
    .findByIdAndUpdate(req.params.id, { $push: { storages: newStorage } }, { new: true })
    .then(updatedUser => res.json(updatedUser))
});

usersRouter.delete('/storages/:id/:storageid', (req, res) => {
  User.findByIdAndUpdate(req.params.id, { $pull: { storages: req.params.storageid } })
    .then(() => res.status(204).end());
});

usersRouter.put('/categories/:id', (req, res) => {
  const newCategory = req.body._id;

  User
    .findByIdAndUpdate(req.params.id, { $push: { categories: newCategory } }, { new: true })
    .then(updatedUser => res.json(updatedUser));
});


export default usersRouter;