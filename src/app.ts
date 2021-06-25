import 'reflect-metadata';
import 'dotenv/config';
import 'express-async-errors';
import './database';

import express, { NextFunction, Request, Response } from 'express';
import cors from 'cors';

import { AppError } from './errors/AppError';
import middlewares from './middlewares';
import routes from './routes';

const app = express();

app.use(express.json());
app.use(cors());
app.use(middlewares);
app.use(routes);

app.use(
  (err: Error, request: Request, response: Response, _next: NextFunction) => {
    if (err instanceof AppError) {
      return response.status(Number(err.statusCode)).json({
        message: err.message,
      });
    }
    return response.status(500).json({
      status: 'Error',
      message: `Internal server error ${err.message}`,
    });
  },
);

export default app;
