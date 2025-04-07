import { Request, Response } from "express";
import { ApiResponse } from "@utils/apiResponse";
import Container from "typedi";
import { CartService } from "@services/cart.service";

export class CartController {
  public cart = Container.get(CartService);

  public getCart = async (req: Request, res: Response) => {
    try {
      const cart = await this.cart.getCart();

      res.status(200).json(new ApiResponse("success", "Cart is retrieved", cart));
    } catch (error: any) {
      res.status(error.statusCode).json(new ApiResponse("fail", error.message));
    }
  };

  public addItemToCart = async (req: Request, res: Response) => {
    try {
      const meal = await this.cart.addItemToCart(req.body.name, req.body.price);

      res.status(200).json(new ApiResponse("success", "Meal added to cart", meal));
    } catch (error: any) {
      res.status(error.statusCode).json(new ApiResponse("fail", error.message));
    }
  };

  public getCountFromCart = async (req: Request, res: Response) => {
    try {
      const count = await this.cart.getCountFromCart();

      res.status(200).json(new ApiResponse("success", "Retrieve count meal from cart", { count }));
    } catch (error: any) {
      res.status(error.statusCode).json(new ApiResponse("fail", error.message));
    }
  };
}
