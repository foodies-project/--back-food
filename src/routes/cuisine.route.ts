import { CuisineController } from "@controllers/cuisine.controller";
import { Route } from "@interfaces/route.interface";
import { Router } from "express";

export class CuisineRoute implements Route {
  public path = "/cuisine";
  public router: Router = Router();
  public cuisine = new CuisineController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.cuisine.getCuisines);
  }
}
