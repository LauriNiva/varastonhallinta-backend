import Storage from '../models/storage.model.js';
import express from 'express';

const storagesRouter = express.Router();


storagesRouter.get('/:id', (req, res) => {
  Storage
    .findById(req.params.id)
    .then(storage => res.json(storage))
    .catch();
});

export default storagesRouter;