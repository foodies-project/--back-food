import { CustomError } from '@errors/CustomError';
import { OrderHistoryService } from '@services/order-history.service';
import { ApiResponse } from '@utils/apiResponse';
import { Request, Response } from 'express';
import Container from 'typedi';

export class OrdersHistoryController {
  public ordersHistory = Container.get(OrderHistoryService);

  public getOrdersHistory = async (req: Request, res: Response) => {
    try {
      const token = req.cookies.token;
      // const userId = req.query.userId;
      // if (!userId) {
      //   throw new CustomError(400, 'User id is not exist');
      // }

      if (!token) {
        throw new CustomError(404, 'Token not found');
      }

      const history = await this.ordersHistory.getOrdersHistory(token);
      res.status(200).json(new ApiResponse('Order history is retrieved', history));
    } catch (error: any) {
      if (error instanceof CustomError) {
        res.status(error.statusCode).json(new ApiResponse(error.message));
      } else {
        res.status(500).json(new ApiResponse('Unexpected error' + error.message));
      }
    }
  };
}
