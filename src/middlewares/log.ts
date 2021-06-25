import { NextFunction, Request, Response } from 'express';

export default (
  request: Request,
  response: Response,
  next: NextFunction,
): void => {
  const { method, url, params, query, ip } = request;
  // eslint-disable-next-line no-console
  console.log(method, url, params, query, ip);

  next();
};
