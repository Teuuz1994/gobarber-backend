import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateUserService from '@modules/users/services/CreateUserService';

export default class UsersController {
  public async create(request: Request, response: Response): Promise<Response> {
    try {
      const { name, email, password } = request.body;

      const createUserService = container.resolve(CreateUserService);

      const user = await createUserService.execute({ name, email, password });

      delete user.password;

      return response.json(user);
    } catch (error) {
      return response.status(400).json({ error: error.message });
    }
  }
}
