import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import constants from "./constants";
import database from "../database/database";
import router from "../api/routes/router";
import ErrorMiddleware from "../api/middlewares/error-middleware";

class App {
  private app: express.Application;

  constructor() {
    this.app = express();
    console.log("Setting configs...")
    this.config();
    console.log("Connecting database...");
    database.connect();
    console.log("App ready!!");
  }

  /**
   * Setting express config
   */
  private config(): void {
    this.app.use(express.json({ limit: '1mb' }));
    this.app.use(express.urlencoded({ limit: '1mb', extended: true }));
    this.app.use(cors());
    this.app.use("/api", router);
    this.app.use((err: Error, req: Request, res: Response, next: NextFunction): void => {
      ErrorMiddleware.responseError(err, res);
    });
  }

  /**
   * Run server
   * @returns server
   */
  public run() {
    return this.app.listen(constants.APP_PORT, async () => {
      console.log(`Server Up on port: ${constants.APP_PORT}!!`);
    });
  }
}

export default new App().run();
