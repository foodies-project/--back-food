import { Cuisine, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

console.log(prisma); // Переконайся, що тут є cuisine

import { Service } from "typedi";

@Service()
export class CuisineService {
  public cuisine = prisma.cuisine;

  public async getCuisines(): Promise<Cuisine[]> {
    const cuisines = await this.cuisine.findMany({ select: { id: true, name: true, icon: true } });

    return cuisines;
  }
}
