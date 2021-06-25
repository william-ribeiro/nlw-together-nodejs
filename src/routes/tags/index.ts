import { Router } from 'express';
import { CreateTagController } from '../../controllers/CreateTagController';
import { ListTagController } from '../../controllers/ListTagController';

const routes = Router();
const createTagController = new CreateTagController();
const listTagController = new ListTagController();

routes.get('/', listTagController.handle);
routes.post('/', createTagController.handle);

export default routes;
