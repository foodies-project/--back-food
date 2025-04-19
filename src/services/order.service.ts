import { prisma } from '@utils/prisma_db';
import { Service } from 'typedi';

@Service()
export class OrderService {
  public order = prisma.order;

  public createOrder = (userId: number): Promise<Order> => {
    const order = this.order.create({ data: {} });
  };
}
