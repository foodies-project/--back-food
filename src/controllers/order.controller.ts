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
      const token = req.cookies.token;
      if (!token) {
        throw new CustomError(404, 'Token not found');
      }

      const dishes = req.body.dishes;

      if (!dishes) {
        res.status(400).json(new ApiResponse('Dishes not found'));
      }
      const order = await this.order.createOrder(token, dishes);
      res.status(200).json(new ApiResponse('Order is created', order));
    } catch (error) {
      if (error instanceof CustomError) {
        res.status(error.statusCode).json(new ApiResponse(error.message));
      } else {
        res.status(500).json(new ApiResponse('Unexpected error' + error));
      }
    }
  };

  public orderPay = async (req: Request, res: Response) => {
    try {
      const token = req.cookies.token;
      if (!token) {
        throw new CustomError(404, 'Token not found');
      }
      const items = req.body.items;
      const sum = req.body.sum;

      const userPayObj = await this.order.orderPay(token, items, sum);
      res.status(200).json(new ApiResponse('', userPayObj));
    } catch (error) {
      if (error instanceof CustomError) {
        res.status(error.statusCode).json(new ApiResponse(error.message));
      } else {
        res.status(500).json(new ApiResponse('Unexpected error' + error));
      }
    }
  };

  public validatePay = (req: Request) => {
    const body = req.body;
    const validate = this.order.validatePay(body);
  };
}
