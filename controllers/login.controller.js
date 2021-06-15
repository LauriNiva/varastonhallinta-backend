import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import express from 'express';
const loginRouter = express.Router();
import User from '../models/user.model.js';

loginRouter.post('/', async (req, res) => {
  const body = req.body;

  const user = await User.findOne({ username: body.username });
  const passwordCorrect = user === null
    ? false
    : await bcrypt.compare(body.password, user.passwordHash);

  if (!(user && passwordCorrect)) {
    return res.status(401).json({ error: 'Invalid username or password' });
  }

  const userForToken = {
    username: user.username,
    id: user.id,
  };

  const token = jwt.sign(userForToken, process.env.SECRET, { expiresIn: 60*30 });

  res
    .status(200)
    .send({ token, username: user.username, name: user.name, id: user.id });
});

export default loginRouter;