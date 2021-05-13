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

categoriesRouter.post('/single', (req, res) => {
  const body = req.body;
  
  const newCategory = new Category({
    name: body.name
  });

  newCategory.save()
  .then(savedCategory => {
    res.json(savedCategory);
  })
});

categoriesRouter.delete('/single/:id', (req, res) => {
  Category.findByIdAndDelete(req.params.id)
    .then(() => res.status(204).end())
});

export default categoriesRouter;