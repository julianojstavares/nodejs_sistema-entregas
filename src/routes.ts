import { CreateClientController } from './modules/clients/useCases/createClient/createClientController';
import { Router } from "express";

const routes = Router();

const createClientController = new CreateClientController();

routes.post("/client/", createClientController.handle);

export { routes };