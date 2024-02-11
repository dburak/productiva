import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import config from '../utils/config';

interface DecodedTokenUser {
  id: string;
  email: string;
}

interface CustomRequest extends Request {
  token?: string;
  user?: DecodedTokenUser;
}

const tokenExtractor = (
  request: CustomRequest,
  response: Response,
  next: NextFunction
) => {
  const authorization = request.headers.authorization;

  if (authorization && authorization.startsWith('Bearer ')) {
    request.token = authorization.replace('Bearer ', '');
    next();
  } else {
    response.status(401).json({ error: 'Unauthorized' });
  }
};

const userExtractor = (
  request: CustomRequest,
  response: Response,
  next: NextFunction
) => {
  try {
    const token = request.token;

    if (!token) {
      return response.status(401).json({ error: 'Token missing' });
    }

    const decodedToken = jwt.verify(token, config.SECRET) as DecodedTokenUser;

    if (!decodedToken.id) {
      return response.status(401).json({ error: 'Token invalid' });
    }

    request.user = decodedToken;
    next();
  } catch (error) {
    response.status(401).json({ error: 'Unauthorized' });
  }
};

const tokenAndUserExtractor = (
  request: CustomRequest,
  response: Response,
  next: NextFunction
) => {
  try {
    const authorization = request.headers.authorization;

    if (!authorization || !authorization.startsWith('Bearer ')) {
      return response.status(401).json({ error: 'Unauthorized' });
    }

    const token = authorization.replace('Bearer ', '');

    if (!token) {
      return response.status(401).json({ error: 'Token missing' });
    }

    const decodedToken = jwt.verify(token, config.SECRET) as DecodedTokenUser;

    if (!decodedToken.id) {
      return response.status(401).json({ error: 'Token invalid' });
    }

    request.user = decodedToken;
    next();
  } catch (error) {
    response.status(401).json({ error: 'Unauthorized' });
  }
};

export { tokenExtractor, userExtractor, tokenAndUserExtractor };
