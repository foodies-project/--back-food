import { CustomError } from '@errors/CustomError';
import { CuisineService } from '@services/cuisine.service';
import { ApiResponse } from '@utils/apiResponse';
import { Request, Response } from 'express';
import Container from 'typedi';

export class CuisineController {
  public cuisine = Container.get(CuisineService);

  public getCuisines = async (req: Request, res: Response) => {
    try {
      const cuisines = await this.cuisine.getCuisines();
      res.status(200).json(new ApiResponse('Data sent', cuisines));
    } catch (error: any) {
      if (error instanceof CustomError) {
        res.status(error.statusCode).json(new ApiResponse(error.message));
      } else {
        res.status(500).json(new ApiResponse('Unexpected error' + error.message));
      }
    }
  };
}
