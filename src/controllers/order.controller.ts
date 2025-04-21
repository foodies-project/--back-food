import Container from 'typedi';
import { OrderService } from '@services/order.service';
import { Order } from '@interfaces/order.interface';
import { Request, Response } from 'express';
import { CustomError } from '@errors/CustomError';
import { ApiResponse } from '@utils/apiResponse';

export class OrderController {
  public order = Container.get(OrderService);

  public createOrder = async (req: Request, res: Response) => {
    try {
      const userId = req.params.userId as string;
      const dishes = req.body.dishes;

      if (!dishes) {
        res.status(400).json(new ApiResponse('fail', 'Dishes not found'));
      }
      const order = await this.order.createOrder(+userId, dishes);
      res.status(200).json(new ApiResponse('success', 'Order is created', order));
    } catch (error) {
      if (error instanceof CustomError) {
        res.status(error.statusCode).json(new ApiResponse('fail', error.message));
      } else {
        res.status(500).json(new ApiResponse('fail', 'Unexpected error' + error));
      }
    }
  };
}
