import { CategoryController } from "@controllers/dish.controller";
import { Route } from "@interfaces/route.interface";
import { Router } from "express";

export class CategoryRoute implements Route {
  public path = "/dishes";
  public router: Router = Router();
  public category = new CategoryController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.category.getDishesByCategoryAndRest);
  }
}
