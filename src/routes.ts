import { Router } from "express";
import { CreateClientController } from './modules/clients/useCases/createClient/createClientController';
import { AuthenticateClientController } from './modules/account/authenticateClient/AuthenticateClientController';
import { CreateDeliverymanController } from "./modules/deliveryman/useCases/createDeliveryman/CreateDeliverymanController";
import { AuthenticateDeliverymanController } from "./modules/account/authenticateDeliveryman/AuthenticateDeliverymanController";
import { CreateDeliveryController } from "./modules/deliveries/useCases/createDelivery/createDeliveryController";
import { ensureAuthenticateClient } from "./middlewares/ensureAuthenticateClient";
import { FindAllAvailableController } from "./modules/deliveries/useCases/findAllAvailable/findAllAvailableController";
import { ensureAuthenticateDeliveryman } from "./middlewares/ensureAuthenticateDeliveryman";
import { UpdateDeliverymanController } from "./modules/deliveries/useCases/updateDeliveryman/updateDeliverymanController";

const routes = Router();

const createClientController = new CreateClientController();
routes.post("/client", createClientController.handle);

const authenticateClientController = new AuthenticateClientController();
routes.post("/client/authenticate", authenticateClientController.handle);

const createDeliverymanController = new CreateDeliverymanController();
routes.post("/deliveryman", createDeliverymanController.handle);

const authenticateDeliverymanController = new AuthenticateDeliverymanController();
routes.post("/deliveryman/authenticate", authenticateDeliverymanController.handle);

const createDeliveryController = new CreateDeliveryController();
routes.post("/delivery", ensureAuthenticateClient, createDeliveryController.handle);

const findAllAvailableController = new FindAllAvailableController();
routes.get("/delivery/available", ensureAuthenticateDeliveryman, findAllAvailableController.handle);

const updateDeliverymanController = new UpdateDeliverymanController();
routes.put("/delivery/updateDeliveryman/:id", ensureAuthenticateDeliveryman, updateDeliverymanController.handle);

export { routes };