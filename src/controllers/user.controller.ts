import { NextFunction, Request, Response } from "express";
import { ApiResponse } from "@utils/apiResponse";
import Container from "typedi";
import { UserService } from "@services/user.service";

export class UserController {
  public user = Container.get(UserService);

  public userRegister = async (req: Request, res: Response) => {
    try {
      const user = await this.user.createUser(req.body);
      const response = new ApiResponse("success", "User created", user);
      res.status(200).json(response);
    } catch (error: any) {
      res.status(401).json(new ApiResponse("fail", error.message));
    }
  };

  public userLogin = async (req: Request, res: Response) => {
    try {
      const user = await this.user.userLogin(req.body);
      const response = new ApiResponse("success", "User is logged in", user);
      res.status(200).json(response);
    } catch (error: any) {
      res.status(401).json(new ApiResponse("fail", error.message));
    }
  };
}
