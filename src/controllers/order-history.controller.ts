import { CustomError } from '@errors/CustomError';
import { OrderHistoryService } from '@services/order-history.service';
import { ApiResponse } from '@utils/apiResponse';
import { Request, Response } from 'express';
import Container from 'typedi';

export class OrdersHistoryController {
  public ordersHistory = Container.get(OrderHistoryService);

  public getOrdersHistory = async (req: Request, res: Response) => {
    try {
      const userId = req.query.userId;
      if (!userId) {
        throw new CustomError(400, 'User id is not exist');
      }

      const history = await this.ordersHistory.getOrdersHistory(+userId);
      res.status(200).json(new ApiResponse('success', 'Order history is retrieved', history));
    } catch (error: any) {
      if (error instanceof CustomError) {
        res.status(error.statusCode).json(new ApiResponse('fail', error.message));
      } else {
        res.status(500).json(new ApiResponse('fail', 'Unexpected error' + error.message));
      }
    }
  };
}
