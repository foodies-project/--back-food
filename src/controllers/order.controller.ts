import Container from 'typedi';
import { OrderService } from '@services/order.service';
import { Order } from '@interfaces/order.interface';

export class OrderController {
  public order = Container.get(OrderService);
}
