import logger from './loggers.js'
import User from '../models/user.model.js';
import jwt from 'jsonwebtoken';

const requestLogger = (request, response, next) => {
  logger.info('Method: ', request.method);
  logger.info('Path:   ', request.path);
  logger.info('Body:   ', request.body);
  logger.info('---');
  next();
};

const errorHandler = (error, request, response, next) => {
  logger.error(error.message);

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' });
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message });
  }  else if (error.name === 'JsonWebTokenError') {
    return response.status(401).json({
      error: 'invalid token'
    })
  }

  next(error);
};

const tokenExtractor = (request, response, next) => {
  const authorization = request.get('authorization');
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    request.token = authorization.substring(7);
  } else {
    request.token = null;

  }
  next();
};

const userExtractor = async (request, response, next) => {
  if (request.token) {
    const decodedToken = jwt.verify(request.token, process.env.SECRET);
    if (!decodedToken.id) {
      return response.status(401).json({ error: 'token missing or invalid' });
    }
    request.user = await User.findById(decodedToken.id);
  } else {
    return response.status(401).json({ error: 'token missing or invalid' });
  }
  next();
}


const middlewares = { requestLogger, errorHandler, tokenExtractor, userExtractor };

export default middlewares;