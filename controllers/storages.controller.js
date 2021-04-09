import Storage from '../models/storage.model.js';
import express from 'express';
import User from '../models/user.model.js';

const storagesRouter = express.Router();


storagesRouter.get('/single/:id', (req, res) => {
  Storage
    .findById(req.params.id)
    .then(storage => res.json(storage))
    .catch();
});

storagesRouter.get('/user/:userid', (req, res) => {
  User.findById(req.params.userid)
  .then(user => {
    Storage
    .find()
    .where('_id')
    .in(user.storages)
    .exec()
    .then(storages => res.json(storages));
  });
});

storagesRouter.get('/array/', (req, res) => {
  const ArrayOfStorageIds = req.body;


  // Storage
  //   .find()
  //   .where('_id')
  //   .in(ArrayOfStorageIds)
  //   .exec()
  //   .then(storages => {
  //     res.json(storages);
  //   });
});

export default storagesRouter;