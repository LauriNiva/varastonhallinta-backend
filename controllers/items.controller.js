import Item from '../models/item.model.js';
import User from '../models/user.model.js';
import express from 'express';

const itemsRouter = express.Router();

itemsRouter.get('/single/:id', (req, res) => {
  Item
    .findById(req.params.id)
    .then(item => res.json(item))
    .catch();
});

itemsRouter.get('/user/:userid', (req, res) => {
  User.findById(req.params.userid)
    .then(user => {
      Item
        .find()
        .where('_id')
        .in(user.items)
        .exec()
        .then(items => res.json(items));
    });
});

itemsRouter.post('/single/', (req, res) => {

  const body = req.body;

  const newItem = new Item({
    itemcode: body.itemcode,
    name: body.name,
    category: body.category
  });

  newItem.save()
    .then(savedItem => {
      res.json(savedItem);
    });
});

itemsRouter.delete('/single/:id', (req, res) => {
  Item.findByIdAndDelete(req.params.id)
    .then(() => res.status(204).end())
});

export default itemsRouter;