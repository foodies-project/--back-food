import { CustomError } from '@errors/CustomError';
import { RestaurantService } from '@services/restaurant.service';
import { ApiResponse } from '@utils/apiResponse';
import { Request, Response } from 'express';
import Container from 'typedi';

export class RestaurantController {
  public restaurant = Container.get(RestaurantService);

  public getRestaurantsByCuisine = async (req: Request, res: Response) => {
    try {
      const isValidType = (value: any): value is 'pick' | 'del' =>
        value === 'pick' || value === 'del';

      const isValidCuisine = (value: any) => value;

      const type = isValidType(req.query.orderType) ? req.query.orderType : 'all';

      const restaurants = await this.restaurant.getRestaurants(
        isValidCuisine(req.query.cuisine),
        type
      );

      res.status(200).json(new ApiResponse('Restaurants retrieved successfully', restaurants));
    } catch (error: any) {
      if (error instanceof CustomError) {
        res.status(error.statusCode).json(new ApiResponse(error.message));
      } else {
        res.status(500).json(new ApiResponse('Unexpected error' + error.message));
      }
    }
  };

  public getRestaurantById = async (req: Request, res: Response) => {
    try {
      const id = req.params.id;

      const restaurant = await this.restaurant.getRestaurantById(Number(id));
      res.status(200).json(new ApiResponse('Restaurant retrieved successfully', restaurant));
    } catch (error: any) {
      if (error instanceof CustomError) {
        res.status(error.statusCode).json(new ApiResponse(error.message));
      } else {
        res.status(500).json(new ApiResponse('Unexpected error' + error.message));
      }
    }
  };
}
