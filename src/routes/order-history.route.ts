import { OrdersHistoryController } from '@controllers/order-history.controller';
import { Route } from '@interfaces/route.interface';
import { Router } from 'express';

export class OderHistoryRoute implements Route {
  public path?: string = '/orders-history';
  public router: Router = Router();
  public ordersHistory = new OrdersHistoryController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes = () => {
    this.router.get(`${this.path}`, this.ordersHistory.getOrdersHistory);
  };
}
