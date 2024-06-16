import express, { NextFunction, Request, Response } from "express";
import config from "./config";
import cors from "cors";
import DB from "./db";
import ErrorResponseMiddleware from "http-response-client/lib/middlewares/error-response-middleware";

class App {
  private app: express.Application;

  constructor() {
    this.app = express();
    console.log("Setting configs...")
    this.setConfig();
    console.log("Connecting to database...")
    DB.initialize();
    console.log("App ready!!");
  }

  /**
   * Setting express config
   */
  private setConfig(): void {
    this.app.use(express.json({ limit: '1mb' }));
    this.app.use(express.urlencoded({ limit: '1mb', extended: true }));
    this.app.use(cors());
    this.app.use((err: Error, req: Request, res: Response, next: NextFunction): void => {
      ErrorResponseMiddleware.errorCatcher(err, res);
    });
  }

  /**
   * Run server
   * @returns server
   */
  public run() {
    return this.app.listen(config.app.APP_PORT, async () => {
      console.log(`Server Up on port: ${config.app.APP_PORT}!!`);
    });
  }
}

export default new App().run();
