import Category from '../models/category.model.js';
import express from 'express';
import User from '../models/user.model.js';

const categoriesRouter = express.Router();

categoriesRouter.get('/user/:userid', (req, res) => {
  User.findById(req.params.userid)
  .then(user => {
    Category
    .find()
    .where('_id')
    .in(user.categories)
    .exec()
    .then(categories => res.json(categories));
  });
});

export default categoriesRouter;