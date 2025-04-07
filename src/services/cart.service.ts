import { CustomError } from "@errors/CustomError";
import { prisma } from "@utils/prisma_db";
import { Service } from "typedi";

@Service()
export class CartService {
  public cart = prisma.cart;
  public meal = prisma.meal;

  public getCart = async () => {
    const cart = await this.cart.findMany({ include: { Meal: true } });

    if (!cart) {
      throw new CustomError(404, "Meals in cart not found");
    }

    return cart;
  };

  public addItemToCart = async (name: string, price: number) => {
    const meal = this.meal.create({
      data: {
        name,
        price,
        cartId: 1,
        quantity: 1,
      },
    });

    return meal;
  };

  public getCountFromCart = async () => {
    const count = this.meal.count();

    return count;
  };
}
