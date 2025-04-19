import { Route } from '@interfaces/route.interface';
import { Router } from 'express';

export class OrderRoute implements Route {
  public path?: string = '/order';
  public router: Router = Router();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes = () => {
    this.router.post(`${this.path}`);
  };
}
