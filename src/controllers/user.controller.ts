import { Request, Response } from 'express';
import { ApiResponse } from '@utils/apiResponse';
import Container from 'typedi';
import { UserService } from '@services/user.service';
import { CustomError } from '@errors/CustomError';

export class UserController {
  public user = Container.get(UserService);

  public userRegister = async (req: Request, res: Response) => {
    try {
      const user = await this.user.createUser(req.body);
      res.status(201).json(new ApiResponse('success', 'User created', user));
    } catch (error: any) {
      if (error instanceof CustomError) {
        res.status(error.statusCode).json(new ApiResponse('fail', error.message));
      } else {
        res.status(500).json(new ApiResponse('fail', 'Unexpected error' + error.message));
      }
    }
  };

  public userLogin = async (req: Request, res: Response) => {
    try {
      const user = await this.user.userLogin(req.body);
      res.status(200).json(new ApiResponse('success', 'User is logged in', user));
    } catch (error: any) {
      if (error instanceof CustomError) {
        res.status(error.statusCode).json(new ApiResponse('fail', error.message));
      } else {
        res.status(500).json(new ApiResponse('fail', 'Unexpected error' + error.message));
      }
    }
  };

  public getUserById = async (req: Request, res: Response) => {
    try {
      const userId = req.params.userId as string;
      const user = await this.user.getUserById(+userId);

      res.status(200).json(new ApiResponse('success', 'User is retrieved', user));
    } catch (error: any) {
      if (error instanceof CustomError) {
        res.status(error.statusCode).json(new ApiResponse('fail', error.message));
      } else {
        res.status(500).json(new ApiResponse('fail', 'Unexpected error' + error.message));
      }
    }
  };
}
