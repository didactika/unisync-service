import mongoose from "mongoose";
import constants from "../bin/constants";

class Database {
  /**
   * Database connection
   */
  public async connect(): Promise<void> {
    await mongoose
      .connect(`mongodb://${constants.DB_HOST}:${constants.DB_PORT}`,
      {
        dbName : constants.DB_NAME,
        user: constants.DB_USERNAME,
        pass: constants.DB_PASSWORD,
        autoCreate: true,
        serverSelectionTimeoutMS: 5000,
      })
      .then(() => {
        console.log("Database connection successful");
      })
      .catch((err) => {
        if (err instanceof global.Error) {
          console.error({
            name: err.name,
            message: err.message});
        }
      });
  }
}
export default new Database();
