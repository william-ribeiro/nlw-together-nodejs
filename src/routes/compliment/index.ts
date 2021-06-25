import { Router } from 'express';
import { CreateComplimentController } from '../../controllers/CreateComplimentController';

const routes = Router();
const createComplimentController = new CreateComplimentController();

routes.post('/', createComplimentController.handle);

export default routes;
