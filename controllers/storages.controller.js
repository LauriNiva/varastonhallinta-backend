import Storage from '../models/storage.model.js';
import express from 'express';
import User from '../models/user.model.js';

const storagesRouter = express.Router();


storagesRouter.get('/:id', (req, res) => {
  Storage
    .findById(req.params.id)
    .then(storage => res.json(storage))
    .catch();
});

storagesRouter.post('/', (req, res) => {
  const body = req.body;

  const newStorage = new Storage({
    name: body.name
  });

  newStorage.save()
    .then(savedStorage => {
      res.json(savedStorage);
    });

});

//KUULUUKO TÄNNE VAI USER CONTROLLERIIN?
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

// Add items to the storage
storagesRouter.post('/:id', (req, res) => {

  const itemsToAdd = req.body;

  Storage.findByIdAndUpdate(req.params.id, { $push: { items: {$each: [...itemsToAdd] } } }, { new: true })
    .then(updatedStorage => res.json(updatedStorage));

});

// Update stock of the item
storagesRouter.put('/:id/:itemid/:change', (req, res) => {

  const storageId = req.params.id;
  const itemId = req.params.itemid;
  const change = req.params.change;

  if (change > 0) {


    Storage.
      findOneAndUpdate({ '_id': storageId, 'items._id': itemId }, { $inc: { 'items.$.stock': 1 } }, { new: true })
      .then(updatedStorage => {
        console.log('u: ', updatedStorage)
        res.json(updatedStorage)
      });

  } else {
    Storage.findById(storageId)
      .then(storage => storage.items.find(item => item._id == itemId))
      .then(item => {
        if (item.stock > 0) {
          Storage.
            findOneAndUpdate({ '_id': storageId, 'items._id': itemId }, { $inc: { 'items.$.stock': -1 } }, { new: true })
            .then(updatedStorage => {
              console.log('u: ', updatedStorage)
              res.json(updatedStorage)
            });
        } else {
          Storage.findById(storageId).then(storage => res.json(storage))
        }
      });
  }

});

storagesRouter.delete('/:id', (req, res) => {
  Storage.findByIdAndDelete(req.params.id)
    .then(() => res.status(204).end())
});

export default storagesRouter;