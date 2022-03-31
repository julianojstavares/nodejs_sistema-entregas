import { Router } from "express";
import { CreateClientController } from './modules/clients/useCases/createClient/createClientController';
import { AuthenticateClientController } from './modules/account/authenticateClient/AuthenticateClientController';

const routes = Router();

const createClientController = new CreateClientController();
routes.post("/client/", createClientController.handle);

const authenticateClientController = new AuthenticateClientController();
routes.post("/authenticate", authenticateClientController.handle);

export { routes };