import { RestaurantController } from "@controllers/restaurant.controller";
import { Route } from "@interfaces/route.interface";
import { Router } from "express";

export class RestaurantRoute implements Route {
  public path = "/restaurants";
  public router: Router = Router();
  public restaurant = new RestaurantController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}/cuisines`, this.restaurant.getRestaurantsByCuisine);
    this.router.get(`${this.path}/:id`, this.restaurant.getRestaurantById);
  }
}
