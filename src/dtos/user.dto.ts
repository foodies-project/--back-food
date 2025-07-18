import { IsString, IsEmail, IsNotEmpty } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  public name!: string;

  @IsEmail()
  @IsNotEmpty()
  public email!: string;

  @IsString()
  @IsNotEmpty()
  public password!: string;
}

export class LoginUserDto {
  @IsEmail()
  @IsNotEmpty()
  public email!: string;

  @IsString()
  @IsNotEmpty()
  public password!: string;
}

export const dtos = {
  create: CreateUserDto,
  login: LoginUserDto,
};
