import Item from '../models/item.model.js';
import express from 'express';

const itemsRouter = express.Router();

itemsRouter.get('/single/:id', (req, res) => {
  Item
    .findById(req.params.id)
    .then(item => res.json(item))
    .catch();
});

itemsRouter.get('/array', (req, res) => {
  const arrayOfItemIds = req.body;

  Item
    .find()
    .where('_id')
    .in(arrayOfItemIds)
    .exec()
    .then(items => {
      res.json(items);
    });

});

export default itemsRouter;