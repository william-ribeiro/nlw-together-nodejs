import { Router } from 'express';
import { ListUserReceiverComplimentsController } from '../../controllers/ListUserReceiverController';

const routes = Router();
const listUserReceiverController = new ListUserReceiverComplimentsController();

routes.get('/', listUserReceiverController.handle);

export default routes;
