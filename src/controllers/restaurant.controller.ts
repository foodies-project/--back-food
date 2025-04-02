import { RestaurantService } from "@services/restaurant.service";
import { ApiResponse } from "@utils/apiResponse";
import { Request, Response } from "express";
import Container from "typedi";

export class RestaurantController {
  public restaurant = Container.get(RestaurantService);

  public getRestaurantsByCuisine = async (req: Request, res: Response) => {
    try {
      const isValidType = (value: any): value is "pickup" | "delivery" => value === "pickup" || value === "delivery";

      const isValidCuisine = (value: any) => value;

      const type = isValidType(req.query.type) ? req.query.type : "all";

      const restaurants = await this.restaurant.getRestaurants(isValidCuisine(req.query.cuisine), type);
      res.status(200).json(new ApiResponse("success", "Restaurants retrieved successfully", restaurants));
    } catch (error: any) {
      res.status(error.statusCode).json(new ApiResponse("fail", error.message));
    }
  };

  public getRestaurantById = async (req: Request, res: Response) => {
    try {
      const id = req.params.id;
      console.log("id:", id);

      const restaurant = await this.restaurant.getRestaurantById(Number(id));
      res.status(200).json(new ApiResponse("success", "Restaurant retrieved successfully", restaurant));
    } catch (error: any) {
      res.status(error.statusCode).json(new ApiResponse("fail", error.message));
    }
  };
}
