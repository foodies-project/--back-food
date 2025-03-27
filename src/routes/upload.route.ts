import { UploadController } from "@controllers/upload.controller";
import { Route } from "@interfaces/route.interface";
import { Router } from "express";

export class UploadRoute implements Route {
  public path = "/files";
  public router: Router = Router();
  public upload = new UploadController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(`${this.path}/:file`, this.upload.getFile);
  }
}
