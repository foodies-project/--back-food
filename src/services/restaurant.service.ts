import { CustomError } from "@errors/CustomError";
import { prisma } from "@utils/prisma_db";
import { Service } from "typedi";

@Service()
export class RestaurantService {
  public restaurant = prisma.restaurant;

  public getRestaurants = async (cuisine: string) => {
    const restaurants = await this.restaurant.findMany({
      where: {
        cuisine: {
          name: cuisine,
        },
      },
    });

    if (restaurants.length === 0) {
      throw new CustomError(404, "Restaurants not found");
    }

    return restaurants;
  };
}
