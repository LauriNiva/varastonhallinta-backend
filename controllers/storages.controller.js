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

storagesRouter.put('/stock/:id', (req, res) => {

  const itemIndex = req.body.itemIndex;
  const newStock = req.body.newStock;

  const query = {};
  query[`items.${itemIndex}.stock`] = newStock;

  console.log('q', query);

  Storage.
  findByIdAndUpdate(req.params.id, { $inc: query }, { new: true })
  .then(updatedStorage =>{
   console.log('u: ',updatedStorage)
   res.json(updatedStorage)
  });

});

export default storagesRouter;