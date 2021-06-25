import { Router } from 'express';
import { AuthenticateUserController } from '../../controllers/AuthenticateUserController';

const routes = Router();
const authenticateUserController = new AuthenticateUserController();

routes.post('/', authenticateUserController.handle);

export default routes;
