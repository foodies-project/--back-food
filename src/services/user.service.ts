import { Service } from "typedi";
import { prisma } from "@utils/prisma_db";
import { CreateUserDto, dtos, LoginUserDto } from "@dtos/user.dto";
import { UserResponse } from "@interfaces/user.interface";
import { validate } from "class-validator";
import { plainToInstance } from "class-transformer";
import { checkPassword, hashPassword } from "@utils/bcrypt";
import { generateToken } from "@utils/jwt";
import { CustomError } from "@errors/CustomError";

@Service()
export class UserService {
  public user = prisma.user;

  public async validateData(userData: any, type: "create" | "login"): Promise<void> {
    // Перевіряємо, чи об'єкт userData визначений
    if (!userData) {
      throw new CustomError(400, "User data is undefined");
    }

    // Для того щоб працював validate перетворюємо userData з простого об'єкта
    // у екземпляр класу
    const userInstance = plainToInstance(dtos[type], userData);
    const errors = await validate(userInstance);
    if (errors.length > 0) {
      throw new CustomError(
        400,
        `Validation failed: ${errors.map((e) => Object.values(e.constraints || {}).join("; "))}`
      );
    }
  }

  public async createUser(userData: CreateUserDto): Promise<{ user: UserResponse; token: string }> {
    await this.validateData(userData, "create");

    const { email, name, password } = userData;

    const existingUser = await this.user.findUnique({ where: { email: email } });

    if (existingUser) {
      throw new CustomError(401, `User ${email} already exists`);
    }

    const token = generateToken({ email: email, name: name });
    const hashedPassword = await hashPassword(password);
    const createdUser = await this.user.create({
      data: { email: email, password: hashedPassword, name: name },
      select: {
        email: true,
        name: true,
        id: true,
      },
    });
    return { user: createdUser, token };
  }

  public async userLogin(userData: LoginUserDto): Promise<any> {
    await this.validateData(userData, "login");

    const { email, password } = userData;

    const existingUser = await this.user.findUnique({ where: { email: email } });
    if (!existingUser) {
      throw new CustomError(404, `User ${email} is not found`);
    }

    const passwordIsValid = await checkPassword(password, existingUser.password);
    if (!passwordIsValid) {
      throw new CustomError(401, `Password is not valid`);
    }

    const token = generateToken({ email, name: existingUser.name });
    return { token };
  }
}
