import { OrderController } from '@controllers/order.controller';
import { Route } from '@interfaces/route.interface';
import { Router } from 'express';

export class OrderRoute implements Route {
  public path?: string = '/order';
  public router: Router = Router();
  public order = new OrderController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes = () => {
    // this.router.post(`${this.path}/:userId`, this.order.createOrder);
    this.router.post(`${this.path}/pay`, this.order.orderPay);
    this.router.post(`${this.path}/pay/validate`, this.order.validatePay);
  };
}
