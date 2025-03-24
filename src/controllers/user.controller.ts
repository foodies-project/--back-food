import { NextFunction, Request, Response } from "express";
import { ApiResponse } from "@utils/apiResponse";
import Container from "typedi";
import { UserService } from "@services/user.service";

export class UserController {
  public user = Container.get(UserService);

  public createUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
      console.log("body", req.body);

      const user = await this.user.createUser(req.body);
      console.log(user);

      const response = new ApiResponse("success", user, "User created");

      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  };
}
