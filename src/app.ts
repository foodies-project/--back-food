import 'reflect-metadata';
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';

import { NODE_ENV, PORT } from './config';
import { Route } from './interfaces/route.interface';

import swaggerUi from 'swagger-ui-express';
import { swaggerDocument } from './swaggerConfig';

export class App {
  public app: express.Application;
  public port: string | number;
  public env: string;

  constructor(routes: Route[]) {
    this.app = express();
    this.port = PORT || 3004;
    this.env = NODE_ENV || 'development';

    this.initializeMiddlewares();
    this.initializeRoutes(routes);
  }

  public listen() {
    this.app.listen(this.port, () => {
      console.log(`=================================`);
      console.log(`======= ENV: ${this.env} =======`);
      console.log(`🚀 App listening on the port ${this.port}`);
      console.log(`=================================`);
    });
  }

  public initializeMiddlewares() {
    this.app.use(
      cors({
        origin: 'http://localhost:5173',
        credentials: true, // Дозволяє передавати кукі
        exposedHeaders: ['Content-Disposition'],
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
        allowedHeaders: ['Content-Type'],
      })
    );

    this.app.use(cookieParser());

    this.app.use(express.json());

    this.app.use('/uploads', express.static('uploads'));

    this.app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
  }

  public initializeRoutes(routes: Route[]) {
    routes.forEach((route) => {
      this.app.use('/api/v1', route.router);
    });
  }
}
