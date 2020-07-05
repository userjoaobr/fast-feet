import { Router } from 'express';
import multer from 'multer';
import multerConfig from './config/multer';

import UserController from './app/controllers/UserController';
import RecipientController from './app/controllers/RecipientController';
import SessionController from './app/controllers/SessionController';
import FileController from './app/controllers/FileController';
import DelivererController from './app/controllers/DelivererController';
import PackageController from './app/controllers/PackageController';
import PickupController from './app/controllers/PickupController';
import DeliverController from './app/controllers/DeliverController';
import ListDeliveriesController from './app/controllers/ListDeliveriesController';
import ListDeliveredController from './app/controllers/ListDeliveredController';
import DeliveryProblemsController from './app/controllers/DeliveryProblemsController';
import authMiddleware from './app/middlewares/auth';

const routes = new Router();
const upload = multer(multerConfig);

/**
 * Routes for non-authenticated users
 */
routes.post('/sessions', SessionController.store);

routes.get('/deliverers/:id', DelivererController.index);
routes.get(
  '/packages/deliverer/:id/deliveries',
  ListDeliveriesController.index
);

routes.get('/packages/deliverer/:id/delivered', ListDeliveredController.index);
routes.put('/packages/:id/pickup', PickupController.update);
routes.put('/packages/:id/deliver', DeliverController.update);

routes.get('/delivery/:id/problems', DeliveryProblemsController.index);
routes.post('/delivery/:id/problems', DeliveryProblemsController.store);

routes.post('/files', upload.single('file'), FileController.store);
/**
 * Routes for authenticated users
 */

routes.use(authMiddleware);

routes.get('/users', UserController.index);
routes.post('/users', UserController.store);
routes.put('/users', UserController.update);

routes.get('/recipients', RecipientController.index);
routes.get('/recipients/:id', RecipientController.index);
routes.post('/recipients', RecipientController.store);
routes.put('/recipients/:id', RecipientController.update);
routes.delete('/recipients/:id', RecipientController.delete);

routes.get('/deliverers', DelivererController.index);
routes.post('/deliverers', DelivererController.store);
routes.put('/deliverers/:id', DelivererController.update);
routes.delete('/deliverers/:id', DelivererController.delete);

routes.get('/packages/:id', PackageController.index);
routes.get('/packages/', PackageController.index);
routes.post('/packages', PackageController.store);
routes.put('/packages/:id', PackageController.update);
routes.delete('/packages/:id', PackageController.delete);
routes.get('/delivery/problems', DeliveryProblemsController.index);

routes.delete(
  '/problem/:id/cancel-delivery',
  DeliveryProblemsController.delete
);

export default routes;
