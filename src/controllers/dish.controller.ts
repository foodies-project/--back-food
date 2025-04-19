import { Request, Response } from 'express';

import { CategoryService } from '@services/dish.service';
import Container from 'typedi';
import { ApiResponse } from '@utils/apiResponse';
import { CustomError } from '@errors/CustomError';

export class CategoryController {
  public dish = Container.get(CategoryService);

  public getDishesByCategoryAndRest = async (req: Request, res: Response) => {
    try {
      const category = req.query.category as string;
      const restaurantId = req.query.restaurantId as string;

      if (!category || !restaurantId) {
        throw new CustomError(400, 'Data is not valid');
      }

      const categories = await this.dish.getDishesByCategoryAndRest(category, +restaurantId);
      res
        .status(200)
        .json(new ApiResponse('success', 'Dishes by category are retrieved', categories));
    } catch (error: any) {
      if (error instanceof CustomError) {
        res.status(error.statusCode).json(new ApiResponse('fail', error.message));
      } else {
        res.status(500).json(new ApiResponse('fail', 'Unexpected error' + error.message));
      }
    }
  };
}
