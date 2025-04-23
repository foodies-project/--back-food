import { User as PrismaUser } from '@prisma/client';

export interface User extends PrismaUser {}

export interface UserResponse {
  name: string;
  id: number;
  email: string;
}
