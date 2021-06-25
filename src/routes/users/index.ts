import { Router } from 'express';
import { CreateUserController } from '../../controllers/CreateUserController';
import { ListUserController } from '../../controllers/ListUserController';

const routes = Router();
const createUserController = new CreateUserController();
const listUserController = new ListUserController();

routes.get('/', listUserController.handle);
routes.post('/', createUserController.handle);

export default routes;
