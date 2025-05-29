import { Request, Response } from 'express';
import { CreateUserDTO, EditUserDTO } from '../dtos/user/';
import UserService from '../services/UserServices';

class UserController {
  private userService: UserService;

  constructor(userService: UserService) {
    this.userService = userService;
  }

  public async create(req: Request<{}, {}, CreateUserDTO>, res: Response) {
    try {
      const response = await this.userService.create(req.body);
      return res
        .status(201)
        .json({
          message: 'User created',
          userId: (response[0] as any).insertId,
        });
    } catch (error: any) {
      if (error.name === 'ValidationError') {
        return res.status(400).json({ errors: error.errors });
      }

      return res.status(500).json({ message: 'Internal server error' });
    }
  }

  public async findById(req: Request<{ id: string }>, res: Response) {
    try {
      const user = <EditUserDTO[]> await this.userService.findById(Number(req.params.id));

      if (user.length === 0) {
        return res.status(404).json({ message: 'User not found' });
      }

      return res.status(200).json(user);
    } catch (error: any) {
      return res.status(500).json({ message: 'Internal server error' });
    }
  }

  public async edit(
    req: Request<{ id: string }, {}, EditUserDTO>,
    res: Response
  ) {
    try {
      await this.userService.edit(req.body, Number(req.params.id));
      return res.status(201).json({ message: 'User edited' });
    } catch (error: any) {
      if (error.name === 'ValidationError') {
        return res.status(400).json({ errors: error.errors });
      }

      return res.status(500).json({ message: 'Internal server error' });
    }
  }

  public async delete(req: Request<{ id: string }>, res: Response) {
    try {
      await this.userService.delete(Number(req.params.id));
      return res.status(204).json({ message: 'User deleted' });
    } catch (error: any) {
      return res.status(500).json({ message: 'Internal server error' });
    }
  }
}

export default UserController;
