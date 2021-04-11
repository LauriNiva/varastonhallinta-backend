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

export default itemsRouter;