import { prisma } from '@utils/prisma_db';
import Container, { Service } from 'typedi';
import { OrderHistoryService } from './order-history.service';
import { Dish } from '@interfaces/dish.interface';
import { validateToken } from '@utils/jwt';
import { CustomError } from '@errors/CustomError';
import Stripe from 'stripe';
import { createSignature } from '@utils/createSignature';

@Service()
export class OrderService {
  public order = prisma.order;
  public orderHistory = Container.get(OrderHistoryService);

  public createOrder = async (token: string, dishes: Dish[]): Promise<any> => {
    const orderHistory = await this.orderHistory.getOrdersHistory(token);

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

  public orderPay = async (token: string, items: any[], sum: number) => {
    const merchantAccount = 'freelance_user_681b5d6d6201a';
    const merchantSecretKey = '9bc2e0ab079191722f6251f123f34045352336d7';

    const payload: any = validateToken(token);
    if (!payload) {
      throw new CustomError(404, 'Token not found');
    }

    const orderReference = `ORDER-${Date.now()}`;
    const orderDate = Math.floor(Date.now() / 1000);
    const productNames = items.map((i) => i.name);
    const productCounts = items.map((i) => i.quantity);
    const productPrices = items.map((i) => i.price);
    const amount = sum * 100;

    const signatureSource = [
      merchantAccount,
      orderReference,
      orderDate,
      amount,
      productNames.join(';'),
      productCounts.join(';'),
      productPrices.join(';'),
    ];

    const signature = createSignature(signatureSource, merchantSecretKey);
    console.log('signature:', signature);

    return {
      merchantAccount,
      merchantDomainName: 'localhost',
      orderReference,
      orderDate,
      amount,
      currency: 'USD',
      productNames,
      productPrices,
      productCounts,
      clientFirstName: payload.name,
      clientEmail: payload.email,
      // returnUrl: 'http://localhost:5173/?order-type=del&cuisine=Sushi',
      // returnUrl: 'https://d560-185-179-214-48.ngrok-free.app/?order-type=del&cuisine=Sushi',
      serviceUrl: 'http://localhost:3004/api/v1/order/pay/validate',
      signature,
    };
  };

  public validatePay = (body: any) => {
    console.log('body', body);

    // function generateSignature(obj: Record<string, any>, secret: string): string {
    //   const keys = [
    //     "merchantAccount",
    //     "orderReference",
    //     "amount",
    //     "currency",
    //     "authCode",
    //     "cardPan",
    //     "transactionStatus",
    //     "reasonCode"
    //   ];
    //   const str = keys.map(key => obj[key]).join(";");
    //   return crypto.createHash("md5").update(str + secret).digest("hex");
    // }

    // app.post("/api/wayforpay/callback", (req, res) => {
    //   const body = req.body;
    //   console.log("📩 Got callback from WayForPay:", body);

    //   const expectedSignature = generateSignature(body, SECRET_KEY);

    //   if (body.merchantSignature !== expectedSignature) {
    //     console.warn("🚫 Invalid signature!");
    //     return res.status(403).send("Invalid signature");
    //   }

    //   if (body.transactionStatus === "Approved") {
    //     console.log("✅ Payment approved for order:", body.orderReference);
    //     // 🔹 Тут онови замовлення в базі: paid: true, статус: confirmed і т.п.
    //   } else {
    //     console.log("❗Payment failed or canceled:", body.transactionStatus);
    //   }

    //   // Обов’язково відповідай саме так:
    //   return res.json({ status: "accept" });
    // });
  };
}
