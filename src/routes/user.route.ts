import { Router } from "express";

import { Route } from "@interfaces/route.interface";
import { UserController } from "@controllers/user.controller";

export class UserRoute implements Route {
  public path = "/user";
  public router: Router = Router();
  public user = new UserController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(`${this.path}`, this.user.createUser);
  }
}
