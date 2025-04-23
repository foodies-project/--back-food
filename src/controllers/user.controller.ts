import { Request, Response } from 'express';
import { ApiResponse } from '@utils/apiResponse';
import Container from 'typedi';
import { UserService } from '@services/user.service';
import { CustomError } from '@errors/CustomError';

export class UserController {
  public user = Container.get(UserService);

  public userRegister = async (req: Request, res: Response) => {
    try {
      const user = await this.user.createUser(req.body, res);
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
      const user = await this.user.userLogin(req.body, res);
      res.status(200).json(new ApiResponse('success', 'User is logged in', user));
    } catch (error: any) {
      if (error instanceof CustomError) {
        res.status(error.statusCode).json(new ApiResponse('fail', error.message));
      } else {
        res.status(500).json(new ApiResponse('fail', 'Unexpected error ' + error.message));
      }
    }
  };

  public getUser = async (req: Request, res: Response) => {
    try {
      const token = req.cookies.token;
      if (!token) {
        throw new CustomError(404, 'No token found');
      }
      const user = await this.user.getUser(token);

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
