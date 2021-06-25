import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';
import { AppError } from '../errors/AppError';

interface IPlayload {
  sub: string;
}

export function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction,
) {
  const authToken = request.headers.authorization;

  if (!authToken) {
    throw new AppError('Token missing', 401);
  }

  const [, token] = authToken.split(' ');

  try {
    const { sub } = verify(
      token,
      '827ccb0eea8a706c4c34a16891f84e7b',
    ) as IPlayload;

    request.user_id = sub;

    return next();
  } catch (error) {
    throw new AppError('Unauthorized', 401);
  }
}
