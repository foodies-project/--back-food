import { prisma } from '@utils/prisma_db';
import Container, { Service } from 'typedi';
import { OrderHistoryService } from './order-history.service';
import { Dish } from '@interfaces/dish.interface';

@Service()
export class OrderService {
  public order = prisma.order;
  public orderHistory = Container.get(OrderHistoryService);

  public createOrder = async (userId: number, dishes: Dish[]): Promise<any> => {
    const orderHistory = await this.orderHistory.getOrdersHistory(userId);

    const orderItemsData = dishes.map((dish) => ({
      name: dish.name,
      price: dish.price,
      photo: dish.photo,
      numberOfOrders: dish.numberOfOrders,
      categoryId: dish.categoryId,
    }));

    const newOrder = await this.order.create({
      data: { orderHistoryId: orderHistory.id, OrderItems: { create: orderItemsData } },
      include: { OrderItems: true },
    });

    return newOrder;
  };
}
