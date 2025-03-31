import { Restaurant as PrismaRestaurant } from "@prisma/client";

export interface Restaurant extends PrismaRestaurant {}

export interface RestaurantById {
  id: number;
  name: string;
  photo: string;
  rating: number;
  deliveryPrice: number;
  minPrepTime: number;
  maxPrepTime: number;
  Cuisine: {
    name: string;
  };
  TypesOfDish: {
    id: number;
    name: string;
  }[];
}
