import { CartController } from "@controllers/cart.controller";
import { Route } from "@interfaces/route.interface";
import { Router } from "express";

export class CartRoute implements Route {
  public path = "/cart";
  public router: Router = Router();
  public cart = new CartController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.cart.getCart);
    this.router.post(`${this.path}`, this.cart.addItemToCart);
    this.router.get(`${this.path}/count`, this.cart.getCountFromCart);
  }
}
