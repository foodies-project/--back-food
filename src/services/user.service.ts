import { Service } from "typedi";
import { prisma } from "@utils/prisma_db";
import { CreateUserDto } from "src/dtos/user.dto";
import { User } from "@interfaces/user.interface";
import { validate } from "class-validator";

@Service()
export class UserService {
  public user = prisma.user;

  public async createUser(userData: CreateUserDto): Promise<User> {
    // Перевіряємо, чи об'єкт userData визначений
    if (!userData) {
      throw new Error("User data is undefined");
    }
    const errors = await validate(userData);
    if (errors.length > 0) {
      throw new Error("Validation failed");
    }

    const existingUser = await this.user.findUnique({ where: { email: userData.email } });

    if (existingUser) {
      throw new Error(`User ${userData.email} already exists`);
    }

    const createdUser = await this.user.create({ data: userData });
    return createdUser;
  }
}
