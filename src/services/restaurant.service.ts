import { CustomError } from '@errors/CustomError';
import { Restaurant, RestaurantById } from '@interfaces/restaurant.interface';
import { prisma } from '@utils/prisma_db';
import { Service } from 'typedi';

const baseSelect = {
  id: true,
  name: true,
  photo: true,
  isOpen: true,
  deliveryPrice: true,
  Cuisine: {
    select: {
      name: true,
    },
  },
  rating: true,
};

const typeSelect = {
  del: {
    ...baseSelect,
    minPrepTime: true,
    maxPrepTime: true,
  },
  pick: {
    ...baseSelect,
    address: true,
    distance: true,
  },
};

@Service()
export class RestaurantService {
  public restaurant = prisma.restaurant;

  public getRestaurants = async (cuisine: string, type: 'del' | 'pick' | 'all') => {
    const select = type === 'all' ? undefined : typeSelect[type];

    const restaurants = await this.restaurant.findMany({
      where: {
        Cuisine: {
          name: cuisine,
        },
      },
      select,
    });

    if (restaurants.length === 0) {
      throw new CustomError(404, 'Restaurants not found');
    }

    return restaurants;
  };

  public getRestaurantById = async (id: number): Promise<RestaurantById> => {
    const restaurant = await this.restaurant.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        photo: true,
        rating: true,
        deliveryPrice: true,
        minPrepTime: true,
        maxPrepTime: true,
        address: true,
        distance: true,
        Cuisine: {
          select: {
            name: true,
          },
        },
        Categories: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });

    if (!restaurant) {
      throw new CustomError(404, 'Restaurant not found');
    }

    return restaurant;
  };
}
