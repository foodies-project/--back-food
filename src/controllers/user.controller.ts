import { Request, Response } from "express";
import { ApiResponse } from "@utils/apiResponse";
import Container from "typedi";
import { UserService } from "@services/user.service";

export class UserController {
  public user = Container.get(UserService);

  public userRegister = async (req: Request, res: Response) => {
    try {
      const user = await this.user.createUser(req.body);
      res.status(201).json(new ApiResponse("success", "User created", user));
    } catch (error: any) {
      res.status(error.statusCode).json(new ApiResponse("fail", error.message));
    }
  };

  public userLogin = async (req: Request, res: Response) => {
    try {
      const user = await this.user.userLogin(req.body);
      res.status(201).json(new ApiResponse("success", "User is logged in", user));
    } catch (error: any) {
      res.status(error.statusCode).json(new ApiResponse("fail", error.message));
    }
  };
}
