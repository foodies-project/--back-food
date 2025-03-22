import express from "express";
import cors from "cors";

import { PORT } from "./config";

export class App {
  public app: express.Application;
  public port: string | number;
  public env: string;

  constructor() {
    this.app = express();
    this.port = PORT || 3004;
    this.env = "development";
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
        origin: "*",
        credentials: true,
        exposedHeaders: ["Content-Disposition"],
        methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
        allowedHeaders: ["Content-Type"],
      })
    );
  }
}
