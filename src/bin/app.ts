import express from "express";
import cors from "cors";
import constants from "./constants";
import database from "../database/database";
import router from "../api/routes/router";

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
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: false }));
    this.app.use(cors());
    this.app.use("/api", router);
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
