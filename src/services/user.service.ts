import { Service } from 'typedi';
import { prisma } from '@utils/prisma_db';
import { CreateUserDto, dtos, LoginUserDto } from '@dtos/user.dto';
import { UserResponse } from '@interfaces/user.interface';
import { validate } from 'class-validator';
import { plainToInstance } from 'class-transformer';
import { checkPassword, hashPassword } from '@utils/bcrypt';
import { generateToken, validateToken } from '@utils/jwt';
import { CustomError } from '@errors/CustomError';

@Service()
export class UserService {
  public user = prisma.user;

  public async validateData(userData: any, type: 'create' | 'login'): Promise<void> {
    if (!userData) {
      throw new CustomError(400, 'User data is undefined');
    }

    const userInstance = plainToInstance(dtos[type], userData);

    const errors = await validate(userInstance);

    if (errors.length > 0) {
      throw new CustomError(
        400,
        `Validation failed: ${errors.map((e) => Object.values(e.constraints || {}).join('; '))}`
      );
    }
  }

  public async createUser(userData: CreateUserDto, res: any): Promise<UserResponse> {
    await this.validateData(userData, 'create');

    const { email, name, password } = userData;

    const existingUser = await this.user.findUnique({ where: { email: email } });

    if (existingUser) {
      throw new CustomError(401, 'User already exists');
    }

    const hashedPassword = await hashPassword(password);
    const createdUser = await this.user.create({
      data: { email: email, password: hashedPassword, name: name },
      select: {
        email: true,
        name: true,
        id: true,
      },
    });

    const token = generateToken({ id: createdUser.id, email, name });

    res.cookie('token', token, {
      httpOnly: true,
      secure: false,
      sameSite: 'lax',
      maxAge: 3600000 * 72,
    });

    return createdUser;
  }

  public async userLogin(userData: LoginUserDto, res: any): Promise<UserResponse> {
    await this.validateData(userData, 'login');

    const { email, password } = userData;

    const existingUser = await this.user.findUnique({
      where: { email: email },
      select: { id: true, name: true, email: true, password: true },
    });
    if (!existingUser) {
      throw new CustomError(404, 'User not found');
    }

    const passwordIsValid = await checkPassword(password, existingUser.password);
    if (!passwordIsValid) {
      throw new CustomError(401, 'Data is not valid');
    }

    const token = generateToken({ id: existingUser.id, email, name: existingUser.name });

    res.cookie('token', token, {
      httpOnly: true,
      secure: true,
      sameSite: 'lax',
      maxAge: 3600000 * 72,
    });

    return { name: existingUser.name, id: existingUser.id, email: existingUser.email };
  }

  public getUser = async (token: string): Promise<UserResponse> => {
    const payload: any = validateToken(token);

    if (!payload) {
      throw new CustomError(401, 'Token is not valid');
    }

    const user = await this.user.findUnique({
      where: { email: payload.email },
      select: { id: true, name: true, email: true, phone: true, photo: true },
    });

    console.log('payload', payload);

    if (!user) {
      throw new CustomError(404, 'User not found');
    }

    return user;
  };

  public changeUserData = async (token: string, params: any, res: any) => {
    const payload: any = validateToken(token);

    if (!payload) {
      throw new CustomError(401, 'Token is not valid');
    }

    if (params.email) {
      const existingUser = await this.user.findUnique({ where: { email: params.email } });

      if (existingUser && existingUser.email !== payload.email) {
        throw new CustomError(400, 'This email is already in use');
      }
    }

    const newUser = await this.user.update({
      where: { email: payload.email },
      data: { ...params },
    });

    const newToken = generateToken({ id: newUser.id, email: newUser.email, name: newUser.name });

    res.cookie('token', newToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'lax',
      maxAge: 3600000 * 72,
    });

    return newUser;
  };
}
