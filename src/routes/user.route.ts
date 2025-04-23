import { Router } from 'express';

import { Route } from '@interfaces/route.interface';
import { UserController } from '@controllers/user.controller';

export class UserRoute implements Route {
  public path = '/auth';
  public router: Router = Router();
  public user = new UserController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(`${this.path}/signup`, this.user.userRegister);
    this.router.post(`${this.path}/login`, this.user.userLogin);
    this.router.get(`${this.path}/users`, this.user.getUser);
  }
}
