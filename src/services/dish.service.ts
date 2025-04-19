import { prisma } from "@utils/prisma_db";
import { Service } from "typedi";

@Service()
export class CategoryService {
  public dish = prisma.dish;
  public category = prisma.category;

  public getDishesByCategoryAndRest = async (
    category: string,
    restaurantId: number
  ): Promise<any> => {
    const dishes = await this.dish.findMany({
      where: { Category: { restaurantId, name: category } },
    });

    return dishes;
  };
}
