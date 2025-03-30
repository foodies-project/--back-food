import { RestaurantService } from "@services/restaurant.service";
import { ApiResponse } from "@utils/apiResponse";
import { Request, Response } from "express";
import Container from "typedi";

export class RestaurantController {
  public restaurant = Container.get(RestaurantService);

  public getRestaurantsByCuisine = async (req: Request, res: Response) => {
    try {
      const restaurants = await this.restaurant.getRestaurants(req.params.cuisine);
      res.status(200).json(new ApiResponse("success", "Restaurants retrieved successfully", restaurants));
    } catch (error: any) {
      res.status(error.statusCode).json(new ApiResponse("fail", error.message));
    }
  };
}
