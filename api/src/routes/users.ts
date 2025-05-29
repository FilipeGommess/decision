import { Request, Response, Router } from 'express';
import UserController from '../controllers/UserController';
import UserService from '../services/UserServices';
import UserRepository from '../repositories/UserRepository';

const router = Router();
const userController = new UserController(new UserService(new UserRepository()));

router.post('/', async (req, res) => {
  await userController.create(req, res);
});

router.get('/:id', async (req: Request<{id: string}>, res) => {
  await userController.findById(req, res);
});

router.put('/:id', async (req: Request<{id: string}>, res) => {
  await userController.edit(req, res);
});

router.delete('/:id', async (req: Request<{id: string}>, res) => {
  await userController.delete(req, res);
});


export default router;
