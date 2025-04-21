import { OrderHistory } from '@interfaces/order-history.interface';
import { prisma } from '@utils/prisma_db';
import { Service } from 'typedi';

@Service()
export class OrderHistoryService {
  public ordersHistory = prisma.orderHistory;

  public createOrderHistory = async (userId: number): Promise<any> => {
    const ordersHistory = await this.ordersHistory.create({
      data: { userId },
      include: {
        Orders: {
          include: {
            OrderItems: true,
          },
        },
      },
    });

    return ordersHistory;
  };

  public getOrdersHistory = async (userId: number): Promise<any> => {
    let ordersHistory = await this.ordersHistory.findFirst({
      where: { userId },
      include: {
        Orders: {
          include: {
            OrderItems: true,
          },
        },
      },
    });

    if (!ordersHistory) {
      ordersHistory = await this.createOrderHistory(userId);
    }

    return ordersHistory;
  };
}
