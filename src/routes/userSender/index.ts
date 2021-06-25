import { Router } from 'express';
import { ListUserSenderComplimentsController } from '../../controllers/ListUserSenderController';

const routes = Router();
const listUserSenderController = new ListUserSenderComplimentsController();

routes.get('/', listUserSenderController.handle);

export default routes;
