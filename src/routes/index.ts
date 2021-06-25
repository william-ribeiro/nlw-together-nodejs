import { Router } from 'express';

import { ensureAdmin } from '../middlewares/ensureAdmin';
import userRouter from './users';
import tagRouter from './tags';
import authRouter from './auth';
import complimentRouter from './compliment';
import userReceiverRouter from './userReceiver';
import userSenderRouter from './userSender';
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';

const routes = Router();

routes.use('/login', authRouter);
routes.use('/users', userRouter);

routes.use(ensureAuthenticated);

routes.use('/users/compliments/receive', userReceiverRouter);
routes.use('/users/compliments/send', userSenderRouter);
routes.use('/compliment', complimentRouter);
routes.use('/tags', ensureAdmin, tagRouter);

export default routes;
