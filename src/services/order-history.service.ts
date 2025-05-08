import { CustomError } from '@errors/CustomError';
import { OrderHistory } from '@interfaces/order-history.interface';
import { validateToken } from '@utils/jwt';
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

  public getOrdersHistory = async (token: string): Promise<any> => {
    const userPayload: any = validateToken(token);

    if (!userPayload) {
      throw new CustomError(401, 'Token is not valid');
    }

    console.log('userPayload', userPayload);

    let ordersHistory = await this.ordersHistory.findUnique({
      where: { userId: userPayload.id },
      include: {
        Orders: {
          include: {
            OrderItems: true,
          },
        },
      },
    });

    if (!ordersHistory) {
      ordersHistory = await this.createOrderHistory(userPayload.id);
    }

    return ordersHistory;
  };
}
